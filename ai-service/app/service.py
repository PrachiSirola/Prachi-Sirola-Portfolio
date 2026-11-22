import os
import time
import httpx
from .schemas import DemoQueryResponse

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:7b")

DETERMINISTIC_DEMOS = {
    "revenue": (
        "SELECT region,\n"
        "       ROUND(SUM(order_total_usd), 2) AS revenue_usd,\n"
        "       COUNT(DISTINCT order_id) AS orders\n"
        "FROM wholesale_orders\n"
        "WHERE order_date >= '2026-07-01' AND order_date < '2026-10-01'\n"
        "GROUP BY region\n"
        "ORDER BY revenue_usd DESC;",
        "FastAPI AI Service: India-South & UAE lead Q3 wholesale revenue with 14.2% basket growth.",
    ),
    "shift": (
        "SELECT shift_name,\n"
        "       COUNT(*) AS total_logs,\n"
        "       ROUND(100.0 * AVG(CASE WHEN delay_mins <= 5 THEN 1 ELSE 0 END), 1) AS on_time_pct\n"
        "FROM attendance_logs\n"
        "WHERE log_month = '2026-10'\n"
        "GROUP BY shift_name\n"
        "ORDER BY on_time_pct DESC;",
        "FastAPI AI Service: Morning and Hybrid cohorts lead adherence at 97.2% and 95.4%.",
    ),
    "sku": (
        "SELECT category,\n"
        "       COUNT(sku_id) AS synced_skus,\n"
        "       ROUND(AVG(sync_duration_ms), 0) AS avg_ms\n"
        "FROM catalog_sync_events\n"
        "WHERE status = 'COMPLETED'\n"
        "GROUP BY category\n"
        "ORDER BY synced_skus DESC\n"
        "LIMIT 5;",
        "FastAPI AI Service: Redis-resumable sync processed 14.6K SKUs with zero dropped batches.",
    ),
}


async def run_nl_to_sql_demo(prompt: str) -> DemoQueryResponse:
    start = time.perf_counter()
    lower = prompt.lower()

    # Optional live local Ollama inference if available on the user's Mac
    try:
        async with httpx.AsyncClient(timeout=2.0) as client:
            health = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
            if health.status_code == 200:
                models = [m.get("name", "") for m in health.json().get("models", [])]
                if any(OLLAMA_MODEL.split(":")[0] in name for name in models):
                    response = await client.post(
                        f"{OLLAMA_BASE_URL}/api/generate",
                        json={
                            "model": OLLAMA_MODEL,
                            "prompt": (
                                "Translate this analytics question into clean DuckDB SQL only, "
                                f"without markdown fences: {prompt}"
                            ),
                            "stream": False,
                        },
                        timeout=8.0,
                    )
                    if response.status_code == 200:
                        sql_text = response.json().get("response", "").strip()
                        elapsed = int((time.perf_counter() - start) * 1000)
                        if sql_text:
                            return DemoQueryResponse(
                                sql=sql_text,
                                insight=f"Generated live locally via FastAPI + Ollama ({OLLAMA_MODEL}).",
                                engine=f"FastAPI · {OLLAMA_MODEL} (Live)",
                                latencyMs=elapsed,
                            )
    except Exception:
        # Gracefully fall back to deterministic local demo output when Ollama isn't running
        pass

    if "shift" in lower or "check-in" in lower or "attendance" in lower:
        sql, insight = DETERMINISTIC_DEMOS["shift"]
    elif "sku" in lower or "inventory" in lower or "sync" in lower:
        sql, insight = DETERMINISTIC_DEMOS["sku"]
    else:
        sql, insight = DETERMINISTIC_DEMOS["revenue"]

    elapsed = max(12, int((time.perf_counter() - start) * 1000))
    return DemoQueryResponse(
        sql=sql,
        insight=insight,
        engine="FastAPI · Local Demo Engine",
        latencyMs=elapsed,
    )
