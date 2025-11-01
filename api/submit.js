const formidable = require('formidable');
const fs = require('node:fs/promises');

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function parseMultipart(req) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
    maxFileSize: 20 * 1024 * 1024,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({ fields, files });
    });
  });
}

async function uploadToCloudinary(file, cloudName, uploadPreset) {
  try {
    const data = await fs.readFile(file.filepath);
    const payload = new URLSearchParams();
    payload.append('file', `data:${file.mimetype};base64,${data.toString('base64')}`);
    payload.append('upload_preset', uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: payload,
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(json));
    }

    return json.secure_url;
  } catch (error) {
    console.error('Cloudinary error:', error);
    return null;
  }
}

async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST,OPTIONS');
    res.end('Method Not Allowed');
    return;
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!webhookUrl || !cloudName || !uploadPreset) {
    res.statusCode = 500;
    res.end('Missing env vars.');
    return;
  }

  try {
    const { fields, files } = await parseMultipart(req);

    const rawImages = files['images[]'] || files.images || [];
    const normalized = Array.isArray(rawImages) ? rawImages : [rawImages];
    const limited = normalized.filter(Boolean).slice(0, 4);

    const uploaded = [];
    for (const file of limited) {
      const url = await uploadToCloudinary(file, cloudName, uploadPreset);
      if (url) {
        uploaded.push(url);
      }
    }

    const content =
      `**New Request — NextArc Studio**\n` +
      `**Category:** ${String(fields.category || '')}\n` +
      `**Budget:** $${String(fields.budget || '')}\n` +
      `**Deadline:** ${String(fields.deadline || '')}\n` +
      `**Contact:** ${String(fields.contact || '')}\n` +
      `**Details:** ${String(fields.details || '')}\n` +
      (uploaded.length ? `\n**Images:**\n${uploaded.map((u) => `<${u}>`).join('\n')}` : '');

    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    if (!discordResponse.ok) {
      const text = await discordResponse.text();
      res.statusCode = 500;
      res.end('Discord error: ' + text);
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true, images: uploaded }));
  } catch (error) {
    console.error(error);
    res.statusCode = error?.httpCode === 413 ? 413 : 500;
    res.end(error?.message || 'Server error');
  }
}

module.exports = handler;
module.exports.config = { api: { bodyParser: false } };
