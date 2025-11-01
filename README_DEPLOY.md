
# NextArc Studio — Deploy Checklist

Follow the steps below to publish the latest build to Vercel. None of the
commands require the Vercel CLI that caused issues previously.

## 1. Push the updated files to GitHub

```bash
git add .
git commit -m "Deploy NextArc Studio"
git push origin main   # replace `main` if your default branch differs
```

If you prefer the GitHub web interface, upload the files from this directory
and commit the changes there instead of using the CLI.

## 2. Configure the required environment variables in Vercel

In the Vercel dashboard open **Project → Settings → Environment Variables** and
add the following keys for both the Production and Preview environments:

| Name | Value | Notes |
| --- | --- | --- |
| `DISCORD_WEBHOOK_URL` | Your Discord webhook URL | Required for contact form submissions |
| `CLOUDINARY_CLOUD_NAME` | `dx2ln0aei` | Provided Cloudinary account |
| `CLOUDINARY_UPLOAD_PRESET` | `nextarc_unsigned` | Ensure the preset allows unsigned uploads |

Click **Save** after entering each variable.

## 3. Trigger a redeploy

Still in the Vercel dashboard, go to **Deployments**, open the latest commit
you just pushed, and click **Redeploy** → **Redeploy**. Wait for the build to
finish and note the `.vercel.app` domain in the deployment summary.

If you prefer to deploy from the command line you can run the following from
your local checkout (no global install required):

```bash
npx vercel --prod
```

## 4. Test the live site

Visit the domain listed in the deployment summary (for example,
`https://your-project.vercel.app`). Submit a form entry to confirm it reaches
Discord and verify Cloudinary uploads succeed.
