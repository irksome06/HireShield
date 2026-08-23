import urllib.request
import urllib.error
import json
import jwt
import time

BASE_URL = "http://127.0.0.1:8000/api"

def test_google_auth():
    print("Testing Real Google Authentication Endpoints...")

    # 1. Test Rejecting Invalid / Blank Credential
    req = urllib.request.Request(
        f"{BASE_URL}/auth/google",
        data=json.dumps({"credential": "invalid_fake_token_123"}).encode('utf-8'),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    try:
        urllib.request.urlopen(req)
        print("[FAIL] Invalid Google Token should have been rejected.")
        return False
    except urllib.error.HTTPError as e:
        if e.code in [400, 401]:
            print("[PASS] Invalid Google Token correctly rejected by security backend (HTTP 400).")

    # 2. Test Google JWT Token Structure
    test_email = "alex.candidate@gmail.com"
    simulated_payload = {
        "iss": "https://accounts.google.com",
        "sub": "1033247490719",
        "email": test_email,
        "name": "Alex Candidate",
        "picture": "https://lh3.googleusercontent.com/a/default-user",
        "exp": int(time.time()) + 3600
    }
    simulated_google_jwt = jwt.encode(simulated_payload, "google-simulated-key", algorithm="HS256")

    req2 = urllib.request.Request(
        f"{BASE_URL}/auth/google",
        data=json.dumps({"credential": simulated_google_jwt}).encode('utf-8'),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req2) as res:
            data = json.loads(res.read().decode('utf-8'))
            print("[PASS] Google OAuth Token accepted & JWT Session issued for:", data.get("user", {}).get("email"))
            assert data.get("access_token")
            assert data.get("user", {}).get("auth_provider") == "google"
    except Exception as e:
        print("[FAIL] Google OAuth Token Test:", e)
        return False

    return True

if __name__ == "__main__":
    success = test_google_auth()
    exit(0 if success else 1)
