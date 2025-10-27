const formidable = require('formidable');
const fs = require('fs');

module.exports.config = { api: { bodyParser: false } };

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end('Method Not Allowed');
  }

  const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
  const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!DISCORD_WEBHOOK_URL || !CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    res.statusCode = 500;
    return res.end('Missing environment variables.');
  }

  const form = formidable({ multiples: true, keepExtensions: true, maxFileSize: 20 * 1024 * 1024 });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.statusCode = 400;
      return res.end('Bad form data: ' + err.message);
    }

    let imgs = [];
    const input = files['images[]'] || files.images || [];
    if (Array.isArray(input)) { imgs = input.slice(0, 4); }
    else if (input && input.filepath) { imgs = [input]; }

    const uploaded = [];
    for (const f of imgs) {
      try {
        const data = fs.readFileSync(f.filepath);
        const b64 = data.toString('base64');
        const formData = new URLSearchParams();
        formData.append('file', `data:${f.mimetype};base64,${b64}`);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        const cloudUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
        const upRes = await fetch(cloudUrl, { method: 'POST', body: formData });
        const json = await upRes.json();
        if (!upRes.ok) throw new Error(JSON.stringify(json));
        uploaded.push(json.secure_url);
      } catch (e) {
        console.error('Cloudinary error:', e);
      }
    }

    const category = (fields.category || '').toString();
    const budget = (fields.budget || '').toString();
    const deadline = (fields.deadline || '').toString();
    const contact = (fields.contact || '').toString();
    const details = (fields.details || '').toString();

    const content = `**New Request — NextArc Studio**\n` +
      `**Category:** ${category}\n` +
      `**Budget:** $${budget}\n` +
      `**Deadline:** ${deadline}\n` +
      `**Contact:** ${contact}\n` +
      `**Details:** ${details}\n` +
      (uploaded.length ? `\n**Images:**\n${uploaded.map(u => `<${u}>`).join('\n')}` : '');

    try {
      const resp = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      if (!resp.ok) {
        const t = await resp.text();
        res.statusCode = 500;
        return res.end('Discord error: ' + t);
      }
    } catch (e) {
      res.statusCode = 500;
      return res.end('Discord fetch failed: ' + e.message);
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true, images: uploaded }));
  });
};
