[README.md](https://github.com/user-attachments/files/32185530/README.md)
# 🤖 AI Resume Analyzer

An intelligent, full-stack application leveraging Google Gemini AI to help job seekers generate ATS-optimized resumes tailored to specific job descriptions while delivering an automated interview preparation suite.

## ✨ Key Features

### 📄 Resume Optimization
- **ATS-Optimized Formatting**: Converts existing resumes into clean, truthful, single-page formats tailored for Applicant Tracking Systems.
- **Job Description Alignment**: Dynamically updates bullet points, technical skills, and keywords to mirror the targeted role.

### 🎯 Interview Preparation Suite
- **Match Score & Gap Analysis**: Calculates a resume-to-JD fit percentage and categorizes missing skills by severity.
- **Question Predictor**: Generates technical and behavioral interview questions customized to your profile and the target role.
- **Structured Prep Plan**: Produces a day-wise roadmap to help candidates close skill gaps before their interview.

### 🎨 Frontend Experience
- **Live A4 Preview**: Renders an accurate print layout using `@react-pdf/renderer`.
- **Export Options**: One-click PDF download and print integration.
- **Clean UI**: Responsive dashboard built with React and Tailwind CSS.

### ⚡ Backend Architecture
- **Gemini AI Integration**: Robust API orchestration with retry and fallback handling.
- **REST API Endpoints**: Clean endpoints for parsing, optimization, and prep generation.
- **Secure Environment**: Environment-variable-backed key management.

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Tailwind CSS, React Router, @react-pdf/renderer |
| Backend | Node.js, Express.js |
| AI Layer | Google GenAI SDK (Gemini Models) |
| Database | MongoDB (MongoDB Atlas) |
| Deployment | Vercel (Frontend), Render (Backend) |

## 📂 Project Structure

```
ai-resume-analyzer/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

## ⚙️ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` root directory:

```
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
MONGO_URI=your_mongodb_connection_string
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

## 🌐 Deployment Architecture

- **Frontend**: Deployed on Vercel with automatic Git deployment triggers.
- **Backend**: Hosted on Render as a Node.js web service.
- **Database**: MongoDB Atlas for managed cloud database operations.

## 📖 Application Workflow

1. **Input**: Upload your current resume and paste the target Job Description (JD).
2. **AI Processing**: Node.js backend sends structured prompts to Gemini AI for keyword matching, gap analysis, and rewriting.
3. **Response**: Server returns optimized resume JSON alongside match analytics.
4. **Export**: Frontend renders the interactive preview and enables seamless A4 PDF downloads.

## 💼 Portfolio Highlights

- Demonstrates production-grade Full-Stack Development (React, Express, MongoDB).
- Showcases practical LLM Orchestration using Google Gemini API.
- Addresses real-world job market needs with automated ATS scoring and keyword alignment.
