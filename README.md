# YouFinance

YouFinance is a lightweight Personal Finance web app that helps users manage accounts, log transactions, track budgets, and view spending reports. Built as a clean, responsive MERN application with an attractive Tailwind-driven UI.
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e91e1af9-99da-4df0-bbef-2dfa771e55ab" hspace="20" />


## Key Features
- User authentication (email + Google Sign-In)
- Manage multiple accounts (checking, savings, etc.)
- Add / edit / delete transactions (income & expense)
- Filter & export transactions; monthly reports & category breakdowns
- Profile & budget settings with in-app alerts

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f75f400f-1f1b-4a78-8805-0144de9ee26a" hspace="20" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/bd1e8dd8-be07-4eaa-8b1d-4172008ecf75" hspace="20" />


## Quickstart (Development)

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (local `mongod` or MongoDB Atlas)

### Install & Run (two terminals)
```bash
# 1. Clone repo
git clone https://github.com/your-username/youfinance.git
cd youfinance

# 2. Backend
cd backend
cp .env.example .env            # edit .env with your MONGO_URI and secrets
npm install
npm run dev                     # starts server (e.g. http://localhost:5000)

# 3. Frontend (new terminal)
cd ../frontend
npm install
npm run dev                     # starts Vite dev server (e.g. http://localhost:5173)
