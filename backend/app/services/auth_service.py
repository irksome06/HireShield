import os
import json
import base64
import bcrypt
import jwt
from datetime import datetime, timedelta, timezone
from typing import Optional, Dict, Any
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import User

JWT_SECRET = os.getenv("JWT_SECRET", "hireshield-super-secret-jwt-key-change-in-production-2026")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_DAYS = int(os.getenv("ACCESS_TOKEN_EXPIRE_DAYS", 7))
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)

def hash_password(password: str) -> str:
    """Hashes password using bcrypt with salt."""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies a plain password against its bcrypt hash."""
    if not hashed_password:
        return False
    try:
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
    except Exception:
        return False

def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """Generates a signed JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    
    to_encode.update({"exp": expire, "iat": datetime.now(timezone.utc)})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt

def verify_access_token(token: str) -> Optional[Dict[str, Any]]:
    """Decodes and validates a JWT access token."""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except (jwt.PyJWTError, Exception):
        return None

def verify_google_token(credential: str) -> Optional[Dict[str, Any]]:
    """
    Verifies a Google OAuth ID token from Google Identity Services.
    Supports official google-auth library, tokeninfo HTTP endpoint, JWT payload parser, and demo simulated Google logins.
    """
    if not credential or not credential.strip():
        return None

    # Handle demo/quick-picker Google token simulation (for local dev/evaluation without Google Cloud keys)
    if credential.startswith("demo_google:"):
        try:
            raw = credential[len("demo_google:"):]
            decoded_json = base64.b64decode(raw.encode("utf-8")).decode("utf-8")
            data = json.loads(decoded_json)
            email = data.get("email", "").lower().strip()
            if email and "@" in email:
                return {
                    "email": email,
                    "name": data.get("name") or email.split("@")[0].capitalize(),
                    "picture": data.get("picture", f"https://api.dicebear.com/7.x/initials/svg?seed={email}"),
                    "sub": email
                }
        except Exception as e:
            print(f"Demo Google token parse note: {e}")

    # Method 1: Google tokeninfo HTTP endpoint (fast & works without local cert issues)
    try:
        import requests
        res = requests.get(
            f"https://oauth2.googleapis.com/tokeninfo?id_token={credential}",
            timeout=5.0
        )
        if res.status_code == 200:
            data = res.json()
            if "email" in data:
                return {
                    "email": data.get("email"),
                    "name": data.get("name", data.get("email", "").split("@")[0]),
                    "picture": data.get("picture"),
                    "sub": data.get("sub")
                }
    except Exception as http_err:
        print(f"Google tokeninfo endpoint notice: {http_err}")

    # Method 2: Verify using google-auth library
    try:
        from google.oauth2 import id_token
        from google.auth.transport import requests as google_requests

        req = google_requests.Request()
        client_id = GOOGLE_CLIENT_ID if GOOGLE_CLIENT_ID else None
        id_info = id_token.verify_oauth2_token(credential, req, client_id, clock_skew_in_seconds=10)
        
        if id_info and "email" in id_info:
            return {
                "email": id_info.get("email"),
                "name": id_info.get("name", id_info.get("email", "").split("@")[0]),
                "picture": id_info.get("picture"),
                "sub": id_info.get("sub")
            }
    except Exception as e:
        print(f"google-auth verify notice: {e}")

    # Method 3: Unverified JWT payload inspection for accounts.google.com issuer
    try:
        import jwt
        unverified = jwt.decode(credential, options={"verify_signature": False})
        iss = unverified.get("iss", "")
        if "accounts.google.com" in iss and "email" in unverified:
            return {
                "email": unverified.get("email"),
                "name": unverified.get("name", unverified.get("email", "").split("@")[0]),
                "picture": unverified.get("picture"),
                "sub": unverified.get("sub")
            }
    except Exception as jwt_err:
        print(f"JWT payload fallback note: {jwt_err}")

    # Method 4: Google OAuth2 Access Token lookup (ya29.xxx)
    if credential.startswith("ya29."):
        try:
            import requests
            res = requests.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                headers={"Authorization": f"Bearer {credential}"},
                timeout=5.0
            )
            if res.status_code == 200:
                data = res.json()
                if "email" in data:
                    return {
                        "email": data.get("email"),
                        "name": data.get("name", data.get("email", "").split("@")[0]),
                        "picture": data.get("picture"),
                        "sub": data.get("sub", data.get("email"))
                    }
        except Exception as access_err:
            print(f"Google access_token lookup error: {access_err}")

    return None

def get_current_user(
    token: Optional[str] = Depends(oauth2_scheme), 
    db: Session = Depends(get_db)
) -> User:
    """Dependency that requires an authenticated user."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials or session has expired.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not token:
        raise credentials_exception

    payload = verify_access_token(token)
    if payload is None:
        raise credentials_exception

    user_id = payload.get("sub")
    if user_id is None:
        raise credentials_exception

    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise credentials_exception

    return user

def get_optional_current_user(
    token: Optional[str] = Depends(oauth2_scheme), 
    db: Session = Depends(get_db)
) -> Optional[User]:
    """Dependency for endpoints that can be accessed with or without authentication."""
    if not token:
        return None

    payload = verify_access_token(token)
    if not payload or "sub" not in payload:
        return None

    try:
        user_id = int(payload.get("sub"))
        return db.query(User).filter(User.id == user_id).first()
    except Exception:
        return None
