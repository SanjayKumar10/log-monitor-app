# 🧾 Log Monitor Application

A full-stack application that analyzes `.log` files, measures how long each job takes from start to finish, and flags them with warnings or errors based on processing time.

---

## 🔧 Features

- Upload `.log` files via UI
- Parse and analyze job durations
- Logs a ⚠️ warning if a job took more than 5 minutes
- Logs a ❌ error if a job took more than 10 minutes
- Generates downloadable PDF reports
- Simple React UI layout

---

## 🧰 Tech Stack

- **Frontend**: React (Vite), Axios
- **Backend**: Node.js, Express, Multer
- **PDF**: jsPDF, AutoTable
- **Testing**: Jest
- **Styling**: CSS (can be replaced with Tailwind)

---

## 🚀 Getting Started

### Install and run the backend
 - cd server
 - npm install
 - node index.js

 - Server runs at: http://localhost:4000

### Install and run the frontend
 - cd ../client
 - yarn install
 - yarn dev

 - Frontend runs at: http://localhost:5173
