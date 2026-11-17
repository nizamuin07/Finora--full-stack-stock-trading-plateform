# FINORA - Full-Stack Stock Trading Platform

FINORA is a demo trading platform inspired by modern trading applications like
Zerodha Kite. Users can create an account, view market charts, manage a
simulated portfolio, and place virtual orders. It does not execute real trades
or connect to a broker.

## Features

### User accounts

- Signup and login with hashed passwords and JWT authentication

### Trading dashboard

- Portfolio overview, holdings, orders, positions, and simulated funds
- Watchlist, buy/sell order ticket, and virtual stop-loss/take-profit
- Candlestick chart with multiple timeframes and market-history data

Market quotes and chart history use Yahoo Finance when available and may be
delayed or unavailable. All order and portfolio activity is for demonstration
only; real-money trading is not supported.

## Technology stack

- Frontend: React, Vite, JavaScript, CSS
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JWT and bcryptjs
- Market data: Yahoo Finance chart endpoint

## Project layout

```text
backend/
  app.js                    Express middleware and route composition
  server.js                 Environment checks, MongoDB connection, startup
  controllers/               HTTP request handlers
  middleware/                Authentication middleware
  model/                     Mongoose models
  routes/                    API route definitions
  schemas/                   Mongoose schemas
  services/                  Market data provider integration

frontend/src/
  landing_page/              Public pages and authentication screens
  services/                  Shared API URL configuration
  trading/
    components/              Chart, market watch, order and portfolio panels
    data/                    Demo market and portfolio fixtures
    services/                Market API client
    utils/                   Chart calculations and formatting
    Trading.jsx              Trading page state and workflow
```

The backend follows a lightweight MVC-style flow:
**route -> controller -> service/model -> response**.

## Run locally

Install and start the backend:

```powershell
cd backend
npm ci
npm run dev
```

Create `backend/.env` with:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

In another terminal, install and start the frontend:

```powershell
cd frontend
npm ci
npm run dev
```

The frontend uses `http://localhost:3002` by default during local development.
To use another backend URL, set `VITE_API_URL` in the frontend environment
before starting or building the frontend.

## Deploy on Render

Create two services from this repository.

### Backend web service

- Root Directory: `backend`
- Build Command: `npm ci`
- Start Command: `npm start`
- Environment Variables:
  - `MONGO_URL`: MongoDB connection string
  - `JWT_SECRET`: long random secret

Render provides `PORT` automatically. The server connects to MongoDB before it
starts listening. Use `/health` as an optional Render health-check path.

### Frontend static site

- Root Directory: `frontend`
- Build Command: `npm ci && npm run build`
- Publish Directory: `dist`
- Environment Variable: `VITE_API_URL=https://<your-backend-service>.onrender.com`

Use the actual public URL of the backend service, including `https://`, and
redeploy the frontend after changing this build-time variable. The frontend
also accepts a bare Render hostname. Do not set `VITE_API_URL` to
`localhost` in production.

If direct navigation or refresh on routes such as `/trading` returns a 404,
add a Render static-site rewrite from `/*` to `/index.html`.

## Checks

```powershell
cd frontend
npm run lint
npm test
npm run build

cd ..\backend
npm test
```

## Security and project status

Keep `.env` files and all database credentials and secrets out of Git. Configure
production secrets through Render environment variables. FINORA is under
development as a virtual-trading demo and is not intended for real-money
trading.
