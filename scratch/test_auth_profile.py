import sys
import os
import requests
import json
import time

API_BASE = "http://127.0.0.1:8000"

def run_tests():
    print("==========================================")
    print("  HIRESHIELD PROFILE & PASSWORD TEST SUITE ")
    print("==========================================")

    test_email = f"profile.tester.{int(time.time())}@defense.org"
    password = "OriginalPassword123!"

    # 1. Sign up
    print("1. Signing up test user...")
    signup_res = requests.post(f"{API_BASE}/api/auth/signup", json={
        "name": "Alex Profile Tester",
        "email": test_email,
        "password": password
    })
    assert signup_res.status_code == 201, f"Signup failed: {signup_res.text}"
    data = signup_res.json()
    token = data["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print(f"   [PASS] User created: {data['user']['name']}")

    # 2. Get Profile
    print("2. Fetching profile (GET /api/auth/me)...")
    me_res = requests.get(f"{API_BASE}/api/auth/me", headers=headers)
    assert me_res.status_code == 200, f"Get me failed: {me_res.text}"
    me_data = me_res.json()
    assert me_data["email"] == test_email
    print("   [PASS] Profile fetched.")

    # 3. Update Profile
    print("3. Updating profile (PUT /api/auth/profile)...")
    update_res = requests.put(f"{API_BASE}/api/auth/profile", headers=headers, json={
        "name": "Alex Mercer (Cyber Lead)",
        "phone": "+1 (555) 382-9912",
        "location": "San Francisco, CA / Bengaluru, IN",
        "bio": "Lead Cybersecurity Researcher specializing in recruitment fraud & threat intelligence.",
        "avatar_url": "https://api.dicebear.com/7.x/bottts/svg?seed=alex"
    })
    assert update_res.status_code == 200, f"Update failed: {update_res.text}"
    up_data = update_res.json()
    assert up_data["name"] == "Alex Mercer (Cyber Lead)"
    assert up_data["phone"] == "+1 (555) 382-9912"
    assert up_data["location"] == "San Francisco, CA / Bengaluru, IN"
    print(f"   [PASS] Profile updated: {up_data['name']} - {up_data['location']}")

    # 4. Test Change Password (Incorrect Current)
    print("4. Testing Change Password with incorrect current password...")
    bad_pw_res = requests.put(f"{API_BASE}/api/auth/change-password", headers=headers, json={
        "current_password": "WrongPassword999!",
        "new_password": "NewSecretPassword456!"
    })
    assert bad_pw_res.status_code == 400, f"Expected 400 on wrong password, got {bad_pw_res.status_code}"
    print("   [PASS] Incorrect password properly rejected.")

    # 5. Test Change Password (Correct Current)
    print("5. Testing Change Password with correct current password...")
    good_pw_res = requests.put(f"{API_BASE}/api/auth/change-password", headers=headers, json={
        "current_password": password,
        "new_password": "NewSecretPassword456!"
    })
    assert good_pw_res.status_code == 200, f"Change password failed: {good_pw_res.text}"
    print("   [PASS] Password changed successfully.")

    # 6. Verify Login with New Password
    print("6. Verifying login with new password...")
    new_login_res = requests.post(f"{API_BASE}/api/auth/login", json={
        "email": test_email,
        "password": "NewSecretPassword456!"
    })
    assert new_login_res.status_code == 200, f"Login with new password failed: {new_login_res.text}"
    print("   [PASS] Login with new password succeeded.")

    print("\n==========================================")
    print("   ALL PROFILE & PASSWORD TESTS PASSED!   ")
    print("==========================================")

if __name__ == "__main__":
    run_tests()
