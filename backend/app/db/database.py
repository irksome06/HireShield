import os
from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Support PostgreSQL if DATABASE_URL provided, else fallback to zero-config SQLite
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./hireshield.db")

# SQLite needs connect_args for multithreading
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """Dependency for obtaining a database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Initializes the database schema and performs schema migrations."""
    import app.db.models
    Base.metadata.create_all(bind=engine)
    
    # Auto-migration for existing SQLite databases to add missing columns
    try:
        with engine.connect() as conn:
            if DATABASE_URL.startswith("sqlite"):
                # Check job_audit_logs
                result = conn.execute(text("PRAGMA table_info(job_audit_logs);")).fetchall()
                col_names = [row[1] for row in result]
                if col_names and "user_id" not in col_names:
                    conn.execute(text("ALTER TABLE job_audit_logs ADD COLUMN user_id INTEGER;"))
                    conn.commit()
                    print("Added missing user_id column to job_audit_logs.")

                # Check users
                u_result = conn.execute(text("PRAGMA table_info(users);")).fetchall()
                u_cols = [row[1] for row in u_result]
                if u_cols:
                    if "phone" not in u_cols:
                        conn.execute(text("ALTER TABLE users ADD COLUMN phone VARCHAR(64);"))
                    if "location" not in u_cols:
                        conn.execute(text("ALTER TABLE users ADD COLUMN location VARCHAR(128);"))
                    if "bio" not in u_cols:
                        conn.execute(text("ALTER TABLE users ADD COLUMN bio TEXT;"))
                    conn.commit()
                    print("Synced users table schema with profile columns.")
        
        # Ensure default evaluator account exists
        seed_default_evaluator()
    except Exception as migr_err:
        print(f"Schema migration note: {migr_err}")

def seed_default_evaluator():
    """Seeds the standard hackathon evaluator account if it does not exist."""
    try:
        from app.db.models import User
        from app.services.auth_service import hash_password
        db = SessionLocal()
        evaluator_email = "evaluator@hireshield.ai"
        existing = db.query(User).filter(User.email == evaluator_email).first()
        if not existing:
            eval_user = User(
                name="Security Evaluator",
                email=evaluator_email,
                hashed_password=hash_password("HireShield2026!"),
                auth_provider="local",
                location="San Francisco, CA",
                bio="Official HireShield evaluator test account."
            )
            db.add(eval_user)
            db.commit()
            print("Seeded default demo account: evaluator@hireshield.ai")
        db.close()
    except Exception as e:
        print(f"Evaluator seeding notice: {e}")
