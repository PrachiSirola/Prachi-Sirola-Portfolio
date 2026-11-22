import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .schemas import DemoQueryRequest, DemoQueryResponse
from .service import run_nl_to_sql_demo

load_dotenv()

app = FastAPI(
    title="Prachi Sirola Portfolio — Optional AI Service",
    version="1.0.0",
    description="Optional FastAPI microservice powering interactive DataLensAI NL-to-SQL previews.",
)

cors_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGIN", "http://localhost:5173").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/api/ai/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "prachi-sirola-ai-service"}


@app.post("/api/ai/demo-query", response_model=DemoQueryResponse)
async def demo_query(payload: DemoQueryRequest) -> DemoQueryResponse:
    return await run_nl_to_sql_demo(payload.prompt)
