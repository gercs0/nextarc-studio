# NextArc Studio — Next.js Ready-to-Deploy
- Next.js 14 + Tailwind
- React UI (tabs, forms, stats)
- API `/api/submit`: uploads images to Cloudinary (unsigned) + posts to Discord (server-side)
- No secrets in client

## Deploy (Vercel)
1) Push repo to GitHub.
2) Vercel → Project → Settings → Environment Variables (Production + Preview):
   - DISCORD_WEBHOOK_URL = https://discord.com/api/webhooks/...
   - CLOUDINARY_CLOUD_NAME = dx2ln0aei
   - CLOUDINARY_UPLOAD_PRESET = nextarc_unsigned
3) Cloudinary → Upload presets → create `nextarc_unsigned` (Unsigned).
4) Deploy.
