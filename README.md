# Personalized Grocery AI System

A Node.js web app for grocery planning, pantry tracking, budgeting, price comparison, recommendations, notifications, admin metrics, settings, and demo login/register flows.

## Features

- Grocery List Manager
- Meal Planner
- Pantry Tracker
- Budget Tracker
- Admin Dashboard
- Notifications
- Product Menu
- Price Comparison
- Recommendations
- Settings
- Login and Register

## Run Locally

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## Push To GitHub

```bash
git init
git add .
git commit -m "Initial Personalized Grocery AI System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/personalized-grocery-ai-system.git
git push -u origin main
```

## Deploy To Render

1. Push this project to GitHub.
2. In Render, choose **New +** then **Web Service**.
3. Connect the GitHub repository.
4. Use these settings:
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Deploy.

This repo also includes `render.yaml`, so Render can detect the service from a blueprint.
