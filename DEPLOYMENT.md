# 🚀 MicroFi Deployment Guide

## Quick Deploy (Recommended)

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Deploy Backend to Railway:
1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select this repository
4. Add environment variables:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `PORT`: 3001
5. Deploy! You'll get a URL like: `https://your-app.railway.app`

#### Deploy Frontend to Vercel:
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project" → Import from GitHub
3. Select this repository
4. Add environment variable:
   - `VITE_API_URL`: Your Railway backend URL (e.g., `https://your-app.railway.app`)
5. Deploy! You'll get a URL like: `https://your-app.vercel.app`

---

### Option 2: Render.com (Full Stack)

#### Deploy Backend:
1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect GitHub repo
4. Settings:
   - **Name**: microfi-backend
   - **Root Directory**: `./`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js`
   - **Environment Variables**:
     - `GEMINI_API_KEY`: Your API key
     - `NODE_ENV`: production
5. Deploy! You'll get: `https://microfi-backend.onrender.com`

#### Deploy Frontend:
1. Click "New" → "Static Site"
2. Connect same GitHub repo
3. Settings:
   - **Name**: microfi-frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**:
     - `VITE_API_URL`: Your backend URL
4. Deploy! You'll get: `https://microfi-frontend.onrender.com`

---

### Option 3: Netlify (Frontend) + Railway (Backend)

#### Deploy Backend:
Same as Railway steps above.

#### Deploy Frontend to Netlify:
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import from Git"
3. Select repository
4. Settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**:
     - `VITE_API_URL`: Your Railway backend URL
5. Deploy! You'll get: `https://your-app.netlify.app`

---

## Manual Deployment Steps

### 1. Update API URLs

Replace all `http://localhost:3001` with your deployed backend URL:

```bash
# Use the config.js file we created
# Update .env with:
VITE_API_URL=https://your-backend-url.com
```

### 2. Build Frontend

```bash
npm run build
```

This creates a `dist/` folder with optimized static files.

### 3. Deploy Backend

Your backend needs:
- Node.js runtime
- Environment variables (GEMINI_API_KEY)
- Port configuration (usually provided by host)

### 4. Update CORS

In `server/index.js`, update CORS to allow your frontend domain:

```javascript
app.use(cors({
  origin: ['https://your-frontend-url.com', 'http://localhost:5173']
}))
```

---

## Environment Variables Needed

### Backend (.env):
```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
NODE_ENV=production
```

### Frontend (.env):
```
VITE_API_URL=https://your-backend-url.com
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

---

## Testing Deployment

1. **Backend Health Check**:
   ```bash
   curl https://your-backend-url.com/api/health
   ```

2. **Frontend**: Visit your frontend URL and test:
   - Connect Account
   - AI Advisor
   - Loan Marketplace
   - Transactions

---

## Free Tier Limits

### Railway:
- $5 free credit/month
- 500 hours execution time

### Render:
- Free tier available
- May sleep after inactivity (30 sec wake-up)

### Vercel:
- 100 GB bandwidth/month
- Unlimited deployments

### Netlify:
- 100 GB bandwidth/month
- 300 build minutes/month

---

## Custom Domain (Optional)

All platforms support custom domains:
1. Buy domain from Namecheap, GoDaddy, etc.
2. Add DNS records in platform settings
3. Enable HTTPS (automatic on all platforms)

---

## Troubleshooting

### CORS Errors:
- Update `server/index.js` CORS settings
- Add your frontend URL to allowed origins

### API Not Connecting:
- Check `VITE_API_URL` environment variable
- Verify backend is running (health check)
- Check browser console for errors

### Build Failures:
- Check Node version (use v18+)
- Clear cache: `npm clean-install`
- Check build logs for specific errors

---

## Quick Commands

```bash
# Test locally before deploying
npm run dev          # Frontend
npm run server       # Backend

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Recommended: Railway + Vercel

**Why?**
- ✅ Easiest setup
- ✅ Free tiers available
- ✅ Auto-deploy on git push
- ✅ Great performance
- ✅ Built-in SSL/HTTPS
- ✅ Custom domains supported

**Total Time**: ~10 minutes to deploy both! 🚀
