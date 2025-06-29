# 🧾 Log Monitor App

A full-stack application that parses `.log` files, analyzes job execution durations, and flags warnings or errors based on thresholds. Built with **Node.js**, **Express**, and a **React (Vite)** frontend. Generates downloadable **PDF reports** from logs.

---

## 🚀 Features

- ✅ Parse `.log` files with job START and END entries
- ⏱️ Calculate durations per job using timestamps
- ⚠️ Log Warnings for jobs over **5 minutes**
- ❌ Log Errors for jobs over **10 minutes**
- 🧾 Download analysis result as **PDF report**
- 📁 Upload `.log` files via React frontend
- 🖥️ View analysis results in a color-coded UI

---

## 📦 Tech Stack

| Layer      | Tech                        |
|------------|-----------------------------|
| Backend    | Node.js, Express, PDFKit    |
| Frontend   | React (Vite), Axios         |
| Styling    | Custom CSS (optional: Tailwind) |
| File Upload| Multer                      |
| PDF Gen    | PDFKit                      |

---

## 📂 Project Structure

