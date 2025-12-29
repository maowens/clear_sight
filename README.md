# Text Reader App

A simple app for reading text from photos with large font display and read-aloud.

## Deploy to Vercel (10 minutes)

### Step 1: Get these files to GitHub

Option A - Upload directly:
1. Go to github.com and sign in (or create account)
2. Click the "+" icon → "New repository"
3. Name it "text-reader", keep it public, click "Create repository"
4. Click "uploading an existing file"
5. Drag all the files from this folder into the browser
6. Click "Commit changes"

Option B - Use Git (if you have it):
```
cd text-reader-app
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/text-reader.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Find and select your "text-reader" repository
4. Click "Deploy" (it will fail - that's okay!)

### Step 3: Add your API key

1. In Vercel, go to your project → Settings → Environment Variables
2. Add a new variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: your API key from console.anthropic.com
3. Click "Save"

### Step 4: Redeploy

1. Go to the "Deployments" tab
2. Click the three dots on the latest deployment
3. Click "Redeploy"

Done! Your app is now live at `your-project-name.vercel.app`

## Add to Android home screen

1. Open your Vercel URL in Chrome on Android
2. Tap the three-dot menu
3. Tap "Add to Home screen"
4. Now it works like an app!
