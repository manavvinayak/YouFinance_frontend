# YouFinance

YouFinance is a lightweight Personal Finance web app that helps users manage accounts, log transactions, track budgets, and view spending reports. Built as a clean, responsive MERN application with an attractive Tailwind-driven UI. &nbsp;
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e91e1af9-99da-4df0-bbef-2dfa771e55ab"  /> &nbsp;&nbsp; 


## Key Features
- User authentication (email + Google Sign-In)
- Manage multiple accounts (checking, savings, etc.)
- Add / edit / delete transactions (income & expense)
- Filter & export transactions; monthly reports & category breakdowns
- Profile & budget settings with in-app alerts

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f75f400f-1f1b-4a78-8805-0144de9ee26a"  /> &nbsp;&nbsp; 

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7ee9d3b0-84b0-41ca-ac14-e32cec903684" /> &nbsp;&nbsp; 


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
