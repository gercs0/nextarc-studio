# NextArc Studio — Option 3 (Serverless image upload + Discord posting)

This version lets buyers attach **images**. The serverless function uploads to **Cloudinary** (free tier) and then posts the request + image URLs to your **Discord** via webhook.

## What’s inside
- `index.html` — black & white site, file upload (drag & drop), professional UX
- `app.js` — submits the form (multipart) to `/api/submit`
- `api/submit.js` — Vercel serverless function:
  - parses form-data with formidable
  - uploads up to 4 images to Cloudinary (unsigned preset)
  - posts to your Discord webhook with embeds + image links
- `vercel.json` — sets Node 18 runtime
- `package.json` — minimal deps
- `.env.example` — environment variables you must set on Vercel

## Setup (FREE)
1) **Create a Cloudinary account** → Dashboard → note your **Cloud name**.  
   - Settings → Upload → **Add Upload Preset** → set to **Unsigned** → name it like `nextarc_unsigned` → Save.
2) **Create a Discord Webhook** in your `#post-a-request` channel → copy URL.
3) **Deploy on Vercel**:
   - `npm i -g vercel` (or use the dashboard)
   - Import the repo/folder
   - Add env vars in Vercel → Project Settings → **Environment Variables**:
     - `DISCORD_WEBHOOK_URL` = your webhook
     - `CLOUDINARY_CLOUD_NAME` = your cloud name
     - `CLOUDINARY_UPLOAD_PRESET` = your unsigned preset name
   - Deploy.
4) Put the Vercel URL in your IG/TikTok bio.

## Notes
- Discord embed shows fields; image URLs are posted as content (Discord limits 1 embed image). Creators can open the links to view full quality.
- You can later switch Cloudinary Unsigned → Signed (more secure) and call your own backend signature endpoint.
- To run locally: `npm install`, then `vercel dev` (ensure you have a `.env` file with the keys).

## Security
- Unsigned uploads are okay for MVP but can be abused. Use a unique preset name and optionally restrict allowed formats in Cloudinary settings.
- When you grow, switch to **signed uploads** or use **Uploadcare**/S3 with signed URLs.
