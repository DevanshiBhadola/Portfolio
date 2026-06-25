# SG Workout — HYROX Training Hub

A complete HYROX / Gym / Weight Loss training site with GitHub Pages hosting and cross-device data sync.

## Main file: `workout.html`

The entry point for the app is **`workout.html`** (not index.html).

After deploying, open your site at:
```
https://yourusername.github.io/sg-workout/workout.html
```
or rename `workout.html` → `index.html` if you want the root URL to work directly.

## Features
- **Dashboard** — progress charts, improvement tracking, today's workout
- **Monthly Calendar** — Sunday-first, color-coded, click any day to open full workout
- **This Week** — day-by-day tabs with exercise checklists, timers, and notes
- **Program** — 6 plan tabs:
  - 🏁 HYROX 12-Week (Sun-start, all 8 stations, day-by-day)
  - 🏋️ Beginner Gym (3-phase, 12-week)
  - 🔥 Weight Loss (3-phase, 12-week)
  - 🎯 8 Stations (full training guides per station)
  - 📊 Benchmarks (checkable milestones)
  - 🔨 Custom Builder (drag & drop exercises to any day)
- **Activity Log** — full session logging with CSV/JSON export
- **GitHub Sync** — data stored in your own repo, works on any device

## Deploy to GitHub Pages (free hosting)

1. Create a GitHub repo (e.g. `sg-workout`)
2. Upload all files to the root of the repo (including the `css/`, `js/`, `data/` folders)
3. Make sure `data/progress.json` exists with content `{}`
4. Go to repo **Settings → Pages → Source: main branch / root**
5. Your site is live at:
   ```
   https://yourusername.github.io/sg-workout/workout.html
   ```

## GitHub Sync Setup

1. Create a GitHub Personal Access Token:
   - GitHub → Settings → Developer settings → Personal access tokens → Fine-grained
   - Give it **Contents: Read and Write** permission on your repo
2. Open your site → **⚙ Settings tab**
3. Enter your token, GitHub username, and repo name
4. Click **Save Config** then **↑ Push to GitHub**

Your progress now syncs across all devices automatically!

## File structure

```
workout.html          ← Main app (entry point)
manifest.json         ← PWA manifest
css/
  style.css           ← All styles
js/
  github.js           ← GitHub API backend
  data.js             ← All training plan data
  app.js              ← State, logic, timers
  render.js           ← UI rendering
  builder.js          ← Drag & drop workout builder
data/
  progress.json       ← Your synced progress (starts as {})
icon-192.png
icon-512.png
```
