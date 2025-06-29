#### 📁 `server/README.md`

# 🧠 Server - Log Monitor App (Backend)

This is the Node.js + Express backend for the Log Monitor App. It handles log parsing, job duration analysis, and PDF report generation.

## ⚙️ Getting Started

###🛠 Install Dependencies

cd server
npm install

### Start Server
- node index.js

## ✨ Features

- Upload `.log` files via REST API
- Analyze job durations (with warnings/errors)
- Generate downloadable PDF reports
- CORS enabled for frontend integration
- Jest-based unit testing

## 🔌 API Endpoints

### `POST /upload`
- Uploads a `.log` file and returns analysis.
- **Form field:** `logfile`
- **Response:** JSON array of job analysis strings.

### `POST /report/pdf`
- Accepts `.log` file and returns a PDF blob.
- **Response:** PDF download stream.

### 🧪 Running Tests (Jest)

yarn test
# or
npm test
