import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv

# Ensure backend/.env is loaded reliably regardless of working directory
backend_env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
if os.path.exists(backend_env_path):
    load_dotenv(dotenv_path=backend_env_path)
load_dotenv()

from app.api.endpoints import router as api_router
from app.api.auth import router as auth_router
from app.db.database import init_db

# Initialize DB
try:
    init_db()
except Exception as e:
    print(f"Startup DB init warning: {e}")

app = FastAPI(
    title="HireShield API",
    description="Recruitment Trust & Scam Intelligence API. Deterministic risk engine, AI entity extraction, Job Trust Passport protocol & JWT Authentication.",
    version="1.0.0"
)

# CORS setup
origins_str = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,http://localhost:8000")
origins = [o.strip() for o in origins_str.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(auth_router, prefix="/api")
app.include_router(api_router, prefix="/api")

# Static frontend mount if dist folder exists (e.g. in Docker deployment)
dist_path = os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist")
if os.path.exists(dist_path):
    app.mount("/", StaticFiles(directory=dist_path, html=True), name="static_frontend")
else:
    @app.get("/")
    def root():
        return {
            "app": "HireShield Recruitment Trust & Scam Intelligence",
            "status": "operational",
            "docs": "/docs",
            "health": "/api/health",
            "auth": "/api/auth/login",
            "history": "/api/history"
        }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run("app.main:app", host=host, port=port, reload=True)
