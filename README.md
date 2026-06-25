# HYROX Training Hub

A complete HYROX training site with GitHub Pages hosting and cross-device data sync.

## Features
- **Dashboard** — progress charts, improvement tracking, today's workout
- **Monthly Calendar** — color-coded by session type, click any day to open full workout
- **This Week** — day-by-day tabs with exercise checklists, timers, and notes
- **Program** — 5 plan tabs:
  - 🏁 HYROX 12-Week (Sun-start, all 8 stations, day-by-day)
  - 🏋️ Beginner Gym (3-phase, 12-week)
  - 🔥 Weight Loss (3-phase, 12-week)
  - 🎯 8 Stations (full training guides)
  - 📊 Benchmarks (checkable milestones)
- **Activity Log** — full session logging with CSV/JSON export
- **GitHub Sync** — data stored in your own repo, works on any device

## Deploy to GitHub Pages (free hosting)

1. Create a GitHub repo (e.g. `hyrox-hub`)
2. Upload all files to the root of the repo
3. Also create `data/progress.json` with content `{}`
4. Go to repo Settings → Pages → Source: main branch, / (root)
5. Your site is live at `https://yourusername.github.io/hyrox-hub`

## GitHub Sync Setup

1. Create a GitHub Personal Access Token:
   - GitHub → Settings → Developer settings → Personal access tokens → Fine-grained
   - Give it "Contents: Read and Write" on your repo
2. Open your site → Settings tab
3. Enter your token, username, and repo name
4. Click "Save Config" → "Push to GitHub"

Your data now syncs across all devices automatically!
