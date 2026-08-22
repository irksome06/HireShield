from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from app.db.database import Base

class JobAuditLog(Base):
    __tablename__ = "job_audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    passport_id = Column(String(64), unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
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
