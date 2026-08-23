import urllib.request
import urllib.error
import json
import base64

BASE_URL = "http://127.0.0.1:8000/api"

def test_google_auth():
    print("Testing Google Authentication Endpoints...")
    
    # 1. Test Demo Google Credential
    demo_payload = {
        "name": "Sarah Connor",
        "email": "sarah.connor@gmail.com",
        "picture": "https://api.dicebear.com/7.x/initials/svg?seed=sarah"
    }
    encoded = base64.b64encode(json.dumps(demo_payload).encode('utf-8')).decode('utf-8')
    demo_credential = f"demo_google:{encoded}"
    
    req = urllib.request.Request(
        f"{BASE_URL}/auth/google",
        data=json.dumps({"credential": demo_credential}).encode('utf-8'),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode('utf-8'))
            print("[PASS] Google Auth Demo Credential:", data.get("user", {}).get("email"))
            assert data.get("access_token")
            assert data.get("user", {}).get("auth_provider") == "google"
    except Exception as e:
        print("[FAIL] Google Auth Demo Credential:", e)
        return False
        
    return True

if __name__ == "__main__":
    success = test_google_auth()
    exit(0 if success else 1)
