# Fuel Cost Calculator

A small tool that tells you exactly what a trip will cost in petrol/diesel —
enter the distance, your vehicle's mileage, and today's fuel price, and it
works out litres needed, total cost, and cost per km.

Built with Next.js (App Router) + plain CSS — no paid services used anywhere.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy for free (GitHub + Vercel)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Fuel cost calculator"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
   Make sure the repo is **Public**.

2. **Deploy on Vercel**
   - Go to https://vercel.com and sign in with your GitHub account (free).
   - Click **Add New → Project**, select this repo.
   - Framework preset will auto-detect as **Next.js** — leave all settings default.
   - Click **Deploy**. No card needed, stay on the free **Hobby** plan.
   - You'll get a live URL like `https://your-project.vercel.app`.

That's it — both steps are free, no subscription required anywhere.
