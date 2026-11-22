from pydantic import BaseModel, Field


class DemoQueryRequest(BaseModel):
    prompt: str = Field(..., min_length=3, max_length=400, description="Natural language query")


class DemoQueryResponse(BaseModel):
    sql: str
    insight: str
    engine: str
    latencyMs: int
