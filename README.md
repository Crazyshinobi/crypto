# 🚀 The Crypto Sentinel

A scalable Node.js service that monitors real-time cryptocurrency prices and triggers persistent user alerts. This project implements a RESTful API and a background polling worker designed to respect external API rate limits.

## 📖 Table of Contents
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [API Endpoints](#api-endpoints)
* [Testing](#testing)
* [AI Disclosure](#ai-disclosure)
* [Links](#links)

---

## ✨ Features
* **RESTful API**: Create, list, and delete cryptocurrency price alerts.
* **Real-time Monitoring**: Background worker fetches live prices every 30-60 seconds.
* **One-Time Trigger Logic**: Once an alert's target price is met, its status changes to `TRIGGERED` and it remains inactive until reset or deleted.
* **Docker Support**: Highly recommended containerization for the API and the Worker.
* **Scalable Architecture**: Separation of concerns between the web server and background processing.

## 🛠 Tech Stack
* **Runtime**: Node.js & Express.js
* **Database**: MongoDB (Mongoose ODM)
* **API Calls**: Axios (Integrating with FreeCryptoAPI)
* **Testing**: Jest & Supertest
* **Infrastructure**: Docker & AWS Free Tier (EC2)

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* MongoDB (Local or Atlas)
* Docker & Docker Compose (optional for local dev)

### Local Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Crazyshinobi/crypto.git
   cd crypto-sentinel
   npm install

2. **Define Environment Variables**
   ```bash
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   CRYPTO_API_KEY=your_api_key

3. **Run Backend Server**
   ```bash
   npm run dev

### Docker file runner
   ```bash
   docker-compose up --build
   ```

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/v1/alerts` | **Create Alert**: Set a target price for a specific cryptocurrency (e.g., BTC at $100,000). |
| **GET** | `/api/v1/alerts` | **List Alerts**: Retrieve all active alerts and their current states (`PENDING` or `TRIGGERED`). |
| **DELETE** | `/api/v1/alerts/:id` | **Delete Alert**: Remove a specific alert from the system by its ID.  |


## 🧪 Testing
The project includes basic unit and integration tests to verify all API endpoints and the core alert triggering logic.
  ```bash
  npm test
  ```

## 🤖 AI Disclosure

In accordance with the assignment requirements regarding the use of AI tools:

* **Project Structure**: Used Gemini/ChatGPT to assist in organizing the modular folder structure (Controllers, Routes, Workers).
* **Testing Boilerplate**: Used Gemini/ChatGPT for generating the initial Jest and Supertest integration test cases.
* **Documentation**: Used Gemini/ChatGPT to draft and format this `README.md`.

## 🔗 Links

* **Live AWS Endpoint**: [Insert your live URL here]

* **Crypto API Provider**: [FreeCryptoAPI](https://freecryptoapi.com)
