# MERN Stack Starter (Minimal Blank White Screen)

A clean, production-ready MERN (MongoDB, Express, React, Node.js) starter template with zero boilerplate UI content. Renders a pure white screen ready for your own components.

## Project Structure

```
├── client/                 # React frontend (Vite)
│   ├── index.html
│   ├── vite.config.js     # Configured with proxy to backend (/api -> localhost:5000)
│   └── src/
│       ├── App.jsx        # Returns clean empty component (white screen)
│       ├── main.jsx       # React DOM root entry
│       ├── index.css      # Clean CSS reset with white background
│       └── components/    # Reusable React components
│
├── server/                 # Node.js + Express backend
│   ├── .env               # Environment configuration
│   ├── .env.example
│   └── src/
│       ├── server.js      # Express server entry point
│       ├── config/
│       │   └── db.js      # Mongoose MongoDB connection
│       ├── controllers/   # Route controllers
│       ├── models/        # Mongoose schemas/models
│       └── routes/        # Express API routes
│
├── package.json           # Root orchestration scripts
└── .gitignore
```

## Quick Start

### 1. Install Dependencies

From the project root directory:

```bash
npm run install:all
```

Or install them individually:
```bash
npm install
cd server && npm install
cd ../client && npm install
```

### 2. Configure Environment Variables

Edit `server/.env` if you need to customize your MongoDB URI or port:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern_starter
NODE_ENV=development
```

### 3. Run the Development Servers

Run both backend and frontend concurrently with a single command from root:

```bash
npm run dev
```

- **Frontend (Client)**: [http://localhost:5173](http://localhost:5173) (Blank white screen)
- **Backend (Server)**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### Running Separately

- Backend only: `npm run dev:server` (or `cd server && npm run dev`)
- Frontend only: `npm run dev:client` (or `cd client && npm run dev`)
# Assistance-project-main
# Assistance-social-media
