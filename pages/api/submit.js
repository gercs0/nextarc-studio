import fs from 'fs';
import formidable from 'formidable';

export const config = { api: { bodyParser: false } };

async function uploadToCloudinary(filepath, mimetype, cloudName, preset) {
  const b64 = fs.readFileSync(filepath, { encoding: 'base64' });
  const body = new URLSearchParams();
  body.append('upload_preset', preset);
  body.append('file', `data:${mimetype};base64,${b64}`);
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const res = await fetch(url, { method: 'POST', body });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error('Cloudinary upload failed: ' + txt);
  }
  const data = await res.json();
  return data.secure_url;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
  const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!DISCORD_WEBHOOK_URL || !CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    return res.status(500).send('Server misconfigured: missing ENV variables.');
  }

  const form = formidable({ multiples: true, maxFileSize: 25 * 1024 * 1024, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).send('Bad form data: ' + err.message);

    const category = fields.category || '-';
    const budget   = fields.budget || '-';
    const deadline = fields.deadline || '-';
    const contact  = fields.contact || fields.email || '-';
    const details  = fields.details || fields.description || '-';

    let fileArr = [];
    if (files && files.files) fileArr = Array.isArray(files.files) ? files.files : [files.files];

    let imageUrls = [];
    try {
      for (const f of fileArr) {
        if (f && f.filepath) {
          const url = await uploadToCloudinary(f.filepath, f.mimetype || 'image/jpeg', CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET);
          imageUrls.push(url);
        }
      }
    } catch (e) {
      return res.status(502).send('Image upload error: ' + e.message);
    }

    const embed = {
      title: '🟢 New Request on NextArc Studio',
      color: 0xffffff,
      fields: [
        { name: 'Category', value: String(category), inline: true },
        { name: 'Budget', value: String(budget), inline: true },
        { name: 'Deadline', value: String(deadline), inline: true },
        { name: 'Contact', value: String(contact), inline: false },
        { name: 'Details', value: (String(details) || '-').slice(0, 1024), inline: false }
      ],
      timestamp: new Date().toISOString()
    };

    const imagesText = imageUrls.length ? imageUrls.map((u,i)=>`${i+1}. ${u}`).join('\n') : null;
    const payload = { content: imagesText ? `**Images:**\n${imagesText}` : null, embeds: [embed] };

    try {
      const resp = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!resp.ok) {
        const t = await resp.text();
        return res.status(502).send('Discord error: ' + t);
      }
    } catch (e) {
      return res.status(502).send('Discord network error: ' + e.message);
    }

    return res.status(200).json({ ok: true, images: imageUrls });
  });
}
