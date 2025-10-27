import formidable from 'formidable'
import { fileFromPath } from 'formdata-node/file-from-path' // not used, but placeholder if needed
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

export const config = {
  api: {
    bodyParser: false
  }
}

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET

async function uploadToCloudinary(filePath, filename){
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
  const form = new FormData()
  form.append('file', fs.createReadStream(filePath), filename)
  form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
  const r = await fetch(url, { method:'POST', body: form })
  if(!r.ok) throw new Error('Cloudinary upload failed')
  return r.json()
}

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if(!DISCORD_WEBHOOK_URL) return res.status(500).json({ error: 'Missing DISCORD_WEBHOOK_URL' })
  if(!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) return res.status(500).json({ error: 'Missing Cloudinary config' })

  const form = formidable({ multiples: true, maxFiles: 4, keepExtensions: true })
  form.parse(req, async (err, fields, files) => {
    if(err){ console.error(err); return res.status(400).json({ error:'Invalid form' }) }

    const category = (fields.category || '').toString()
    const budget = (fields.budget || '').toString()
    const deadline = (fields.deadline || '').toString()
    const description = (fields.description || '').toString()
    const contact = (fields.contact || '').toString()

    let images = []
    try{
      const imgs = files.images
      const arr = Array.isArray(imgs) ? imgs : (imgs ? [imgs] : [])
      for(const f of arr.slice(0,4)){
        if(!f || !f.filepath) continue
        const uploaded = await uploadToCloudinary(f.filepath, f.originalFilename || 'image')
        images.push(uploaded.secure_url)
      }
    }catch(e){
      console.error('Upload error:', e)
    }finally{
      // cleanup tmp files
      const imgs = files.images
      const arr = Array.isArray(imgs) ? imgs : (imgs ? [imgs] : [])
      for(const f of arr){
        try{ fs.unlinkSync(f.filepath) }catch{}
      }
    }

    // Build Discord embed
    const embed = {
      title: 'New Buyer Request — NextArc Studio',
      color: 0xffffff,
      fields: [
        { name: 'Category', value: category || '—', inline: true },
        { name: 'Budget', value: budget || '—', inline: true },
        { name: 'Deadline', value: deadline || '—', inline: true },
        { name: 'Description', value: description || '—', inline: false },
        { name: 'Contact', value: contact || '—', inline: true }
      ],
      footer: { text: `NextArc Studio | ${new Date().toLocaleString()}` }
    }

    // Discord supports one embed image. Additional images can be sent as content links.
    const payload = {
      embeds: [embed],
      content: images.length ? `Images:\n${images.map(u=>`<${u}>`).join('\n')}` : undefined
    }

    try{
      const r = await fetch(DISCORD_WEBHOOK_URL, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      })
      if(!r.ok) throw new Error('Discord webhook failed')
      return res.status(200).json({ ok:true, images })
    }catch(e){
      console.error(e)
      return res.status(500).json({ error:'Failed to post to Discord' })
    }
  })
}
