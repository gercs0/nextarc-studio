
# Quick Deploy (Vercel)

1) Import this folder to a new Vercel project.
2) Project Settings → Environment Variables → add these three keys with the same values as in `.env`:
   - DISCORD_WEBHOOK_URL
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_UPLOAD_PRESET
3) Deploy.
4) Open the live URL → Post a Request → attach images → Submit.

If you want to test locally:
- `npm install -g vercel`
- `vercel dev` (ensure `.env` is present)
