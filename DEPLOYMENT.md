# ProjectForge Deployment Guide

## Architecture
- **Frontend**: Vercel (React + Vite)
- **Backend**: Railway (Node.js + Express)

---

## Backend Deployment (Railway)

### Step 1: Prepare Repository
1. Push your code to GitHub
2. Make sure `server/` folder has:
   - `package.json` with `"start": "node server.js"`
   - `Procfile` with `web: node server.js`

### Step 2: Deploy on Railway
1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set **Root Directory** to `server`
5. Add environment variables:
   ```
   NODE_ENV=production
   CLIENT_URL=https://your-app.vercel.app
   OPENAI_API_KEY=sk-your-key-here
   ```
6. Railway will auto-deploy

### Step 3: Get Backend URL
- Copy the generated URL (e.g., `https://projectforge-backend.up.railway.app`)
- Test: `https://your-url/api/health`

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Repository
1. Make sure `client/` folder has:
   - `vercel.json` (already created)
   - `package.json` with build script

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variable:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```
6. Click "Deploy"

### Step 3: Update Backend CORS
1. Go back to Railway
2. Update `CLIENT_URL` to your Vercel URL:
   ```
   CLIENT_URL=https://your-app.vercel.app
   ```

---

## Environment Variables Summary

### Railway (Backend)
```
NODE_ENV=production
CLIENT_URL=https://your-app.vercel.app
OPENAI_API_KEY=sk-your-key
```

### Vercel (Frontend)
```
VITE_API_URL=https://your-backend.railway.app
```

---

## Testing Deployment

1. Open your Vercel URL
2. Fill the profile form
3. Generate projects
4. Test all features

---

## Troubleshooting

### CORS Errors
- Make sure `CLIENT_URL` in Railway matches your Vercel URL exactly
- No trailing slash in URLs

### API Not Working
- Check Railway logs for errors
- Verify `OPENAI_API_KEY` is set correctly
- Test health endpoint: `/api/health`

### Build Fails
- Check Vercel build logs
- Make sure all dependencies are in `package.json`
