from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=True)  # Nullable for OAuth-only users
    auth_provider = Column(String(32), default="local", nullable=False)  # "local" | "google"
    avatar_url = Column(Text, nullable=True)
    phone = Column(String(64), nullable=True)
    location = Column(String(128), nullable=True)
    bio = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    audit_logs = relationship("JobAuditLog", back_populates="user", cascade="all, delete-orphan")

class JobAuditLog(Base):
    __tablename__ = "job_audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    passport_id = Column(String(64), unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    user = relationship("User", back_populates="audit_logs")

    trust_score = Column(Integer, nullable=False)
    risk_level = Column(String(32), nullable=False)
    risk_color = Column(String(32), nullable=False)
    verdict = Column(String(255), nullable=False)
    summary = Column(Text, nullable=True)

    job_message = Column(Text, nullable=False)
    job_url = Column(String(512), nullable=True)

    # JSON stored payloads
    entities_json = Column(Text, nullable=False)
    deductions_json = Column(Text, nullable=False)
    verifications_json = Column(Text, nullable=False)
    recommendations_json = Column(Text, nullable=False)
