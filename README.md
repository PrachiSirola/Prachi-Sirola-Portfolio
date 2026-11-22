# Prachi Sirola — Personal Portfolio Website

A dark, editorial, production-ready personal portfolio built with **React 19, Vite, TypeScript, Tailwind CSS, Framer Motion, and Lucide React**, backed by a **Node.js / Express / TypeScript** contact API and an optional **Python / FastAPI** AI demo service.

> The portfolio works completely even if the optional Python FastAPI service is not running.

## Project Structure

```text
prachi-sirola-portfolio/
├── frontend/          # React 19 + Vite + TypeScript + Tailwind CSS + Framer Motion
│   ├── public/        # Resume PDF, favicon.svg, robots.txt, sitemap.xml
│   └── src/
│       ├── components/  # layout/, ui/, mockups/
│       ├── sections/    # Hero, Stats, Projects, Experience, Skills, Process, About, Contact
│       ├── data/        # Resume-grounded portfolio content
│       ├── hooks/       # Active section observer
│       ├── services/    # Contact & optional AI API clients
│       ├── styles/      # Global editorial dark styling
│       ├── types/       # Shared TypeScript interfaces
│       └── utils/       # Framer Motion presets
├── backend/           # Node.js + Express + TypeScript contact API (Zod, Helmet, Rate Limit, Nodemailer)
└── ai-service/        # Optional Python + FastAPI service for live DataLensAI query previews
```

## Quick Start on macOS (Latest Version / zsh)

### Prerequisites
- **Node.js 20+ (LTS)** — install via Homebrew if needed: `brew install node`
- **Python 3.11+** *(optional, only for `ai-service`)* — `brew install python`

### 1. Unzip & Enter the Project Folder
```bash
unzip prachi-sirola-portfolio.zip
cd prachi-sirola-portfolio
```

### 2. Start the Express Contact Backend (Terminal Tab 1)
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
The backend starts at `http://localhost:5001` (`GET /api/health`, `POST /api/contact`).
In local development, if SMTP credentials in `backend/.env` are left as defaults, contact submissions are safely logged to your terminal without failing.

### 3. Start the React 19 Frontend (Terminal Tab 2)
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 4. *(Optional)* Start the Python FastAPI AI Service (Terminal Tab 3)
```bash
cd ai-service
cp .env.example .env
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
If you also have [Ollama](https://ollama.com/) running locally with `qwen2.5:7b`, the FastAPI service automatically routes DataLensAI sample prompts through Ollama; otherwise it serves deterministic local responses.

## Production Build
```bash
# Frontend static bundle (output in frontend/dist)
cd frontend && npm run build

# Backend compiled JS (output in backend/dist)
cd backend && npm run build && npm start
```
