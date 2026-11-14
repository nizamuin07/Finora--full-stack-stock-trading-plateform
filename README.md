# FINORA – Full-Stack Stock Trading Platform

FINORA is a full-stack stock trading platform inspired by modern trading applications like Zerodha Kite. It aims to provide users with a seamless experience for exploring stocks, managing portfolios, and performing virtual stock trading.

## 🚀 Project Overview

FINORA is designed as a demo stock trading platform where users can create accounts, log in, manage virtual funds, and monitor their trading activities.

## ✨ Features

### User Authentication
- User Registration
- Secure Login
- Password Hashing
- JWT-based Authentication

### Trading Dashboard
- Portfolio Overview
- Holdings Management
- Orders Management
- Positions Tracking
- Funds Management

### Fund Management
- Add Virtual Funds
- Withdraw Virtual Funds
- Available Balance Tracking

### Trading Features
- Stock Watchlist
- Buy and Sell Interface
- Stock Market Dashboard
- Virtual Trading (In Development)

## 🛠️ Technology Stack

**Frontend**
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Bootstrap

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## 📁 Project Structure

```text
FINORA/
├── backend/
│   ├── models/
│   ├── schemas/
│   ├── package.json
│   └── index.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── landing_page/
│   │   └── trading/
│   └── package.json
│
├── README.md
└── package.json
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to Project

```bash
cd FINORA
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=3002
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5. Start Backend

```bash
npm start
```

### 6. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 7. Start Frontend

```bash
npm run dev
```

## 🔐 Security

- Passwords are hashed using bcryptjs.
- Authentication uses JSON Web Tokens.
- Environment variables are used for sensitive configuration.

## 📌 Project Status

**Currently Under Development**

FINORA is being developed as a virtual stock trading platform. Real-money trading and actual exchange order execution are not supported.

## 👨‍💻 Developer

Developed as a Full-Stack Development Project.

---

⭐ If you like this project, consider giving it a star!
