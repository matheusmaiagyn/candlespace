# CandleSpace

A full-stack artisanal candle e-commerce experience inspired by cozy, modern brands. Built with a TypeScript/Express API and a React + Vite front-end styled to match a warm, inviting aesthetic.

## Project structure
- `backend/` — Express + TypeScript API that serves product data and handles checkout submissions.
- `frontend/` — React + TypeScript single-page app bootstrapped with Vite.

## Getting started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Backend
```bash
cd backend
npm install
npm run dev        # starts on http://localhost:4000
```

### Frontend
```bash
cd frontend
npm install
npm run dev        # starts on http://localhost:5173
```

The Vite dev server proxies `/api` and `/health` requests to the backend for local development. Deployments can use the `VITE_API_URL` environment variable to point to the API base URL.

## Features
- Product catalog with imagery, pricing, and fragrance notes
- Add/remove items from a shopping cart with quantity updates and subtotaling
- Checkout form for customer details, optional gift note, and order submission
- Order confirmation card with delivery estimate
- Warm palette and typography using Playfair Display and Lato, responsive grid layout, and hoverable product cards
