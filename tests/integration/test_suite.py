#!/usr/bin/env python3
"""
Campus Lab - Master Automated Integration Test Suite
Exhaustively tests all REST API paths, sandbox execution, compiler, isolate limits,
multi-user contest rooms, profile analytics, and edge cases.
"""

import sys
import time
import json
import urllib.request
import urllib.error
from urllib.parse import urlencode
from concurrent.futures import ThreadPoolExecutor

BASE_URL = "http://localhost:3000"

# ANSI Terminal Colors
GREEN = "\033[92m"
RED = "\033[91m"
YELLOW = "\033[93m"
CYAN = "\033[96m"
BOLD = "\033[1m"
RESET = "\033[0m"

total_tests = 0
passed_tests = 0
failed_tests = 0

def log_header(title):
    print(f"\n{BOLD}{CYAN}{'='*68}{RESET}")
    print(f"{BOLD}{CYAN}  {title}{RESET}")
    print(f"{BOLD}{CYAN}{'='*68}{RESET}")

def assert_test(name, condition, details=""):
    global total_tests, passed_tests, failed_tests
    total_tests += 1
    if condition:
        passed_tests += 1
        print(f" {GREEN}✔{RESET} {name}")
    else:
        failed_tests += 1
        print(f" {RED}✘{RESET} {name}")
        if details:
            print(f"   {RED}↳ Details: {details}{RESET}")

def http_request(method, path, body=None, token=None, cookie=None, headers_override=None):
    url = f"{BASE_URL}{path}"
    headers = {"Content-Type": "application/json"}
    if headers_override:
        headers.update(headers_override)
    if token:
        headers["Authorization"] = f"Bearer {token}"
    if cookie:
        headers["Cookie"] = cookie

    data = None
    if body is not None:
        if isinstance(body, (dict, list)):
            data = json.dumps(body).encode("utf-8")
        elif isinstance(body, str):
            data = body.encode("utf-8")
        elif isinstance(body, bytes):
            data = body

    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=25) as resp:
            resp_body = resp.read().decode("utf-8", errors="replace")
            cookie_header = resp.headers.get("Set-Cookie", "")
            cors_origin = resp.headers.get("Access-Control-Allow-Origin", "")
            cors_methods = resp.headers.get("Access-Control-Allow-Methods", "")
            parsed = json.loads(resp_body) if resp_body else {}
            meta = {
                "cookie": cookie_header,
                "cors_origin": cors_origin,
                "cors_methods": cors_methods,
                "headers": resp.headers
            }
            return resp.status, parsed, meta
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="replace")
        parsed = {}
        try:
            parsed = json.loads(err_body) if err_body else {}
        except:
            parsed = {"raw": err_body}
        cookie_header = e.headers.get("Set-Cookie", "")
        cors_origin = e.headers.get("Access-Control-Allow-Origin", "")
        cors_methods = e.headers.get("Access-Control-Allow-Methods", "")
        meta = {
            "cookie": cookie_header,
            "cors_origin": cors_origin,
            "cors_methods": cors_methods,
            "headers": e.headers
        }
        return e.code, parsed, meta
    except Exception as e:
        return 0, {"error": str(e)}, {}

# ==============================================================================
# SECTION 1: SYSTEM HEALTH, LOGGING, CORS & ROUTING
# ==============================================================================
def test_system_health_and_cors():
    log_header("SECTION 1: SYSTEM HEALTH, LOGGING, CORS & ROUTING")

    # 1. Root health check
    status, body, _ = http_request("GET", "/")
    assert_test("GET / responds with HTTP 200", status == 200, f"Status: {status}")
    assert_test("Health check has success: true", body.get("success") is True)
    assert_test("Health check reports version: 2.0.0", body.get("version") == "2.0.0")
    assert_test("Health check reports C++ Isolate Sandbox engine", "Isolate Sandbox" in body.get("engine", ""))

    # 2. Client error log endpoint (various body shapes)
    status, body, _ = http_request("POST", "/api/v1/client-log", {"error": "UI error message", "stack": "at Component.tsx:42"})
    assert_test("POST /api/v1/client-log with JSON object returns 200", status == 200)

    status, body, _ = http_request("POST", "/api/v1/client-log", ["error line 1", "error line 2"])
    assert_test("POST /api/v1/client-log with JSON array returns 200", status == 200)

    status, body, _ = http_request("POST", "/api/v1/client-log", "Plain string error message")
    assert_test("POST /api/v1/client-log with raw string returns 200", status == 200)

    status, body, _ = http_request("POST", "/api/v1/client-log", "")
    assert_test("POST /api/v1/client-log with empty body returns 200", status == 200)

    # 3. Non-existent route
    status, body, _ = http_request("GET", "/api/v1/non_existent_endpoint_xyz")
    assert_test("GET /api/v1/non_existent_endpoint returns 404", status == 404)

    # 4. CORS Preflight Requests (OPTIONS)
    status, _, meta = http_request("OPTIONS", "/api/v1/problems")
    assert_test("OPTIONS /api/v1/problems returns 204", status == 204)
    assert_test("CORS allows origin", meta.get("cors_origin") in ["http://localhost:5173", "http://localhost:4000"])
    assert_test("CORS exposes standard HTTP methods", "POST" in meta.get("cors_methods", ""))

    status, _, meta = http_request("OPTIONS", "/api/v1/auth/login")
    assert_test("OPTIONS /api/v1/auth/login returns 204", status == 204)

    status, _, meta = http_request("OPTIONS", "/api/v1/code-execution/run")
    assert_test("OPTIONS /api/v1/code-execution/run returns 204", status == 204)

# ==============================================================================
# SECTION 2: AUTHENTICATION APIS DEEP DIVE (PURE OAUTH & SESSION MGMT)
# ==============================================================================
def test_authentication_deep_dive():
    log_header("SECTION 2: AUTHENTICATION APIS DEEP DIVE")

    ts = int(time.time() * 1000)
    email1 = f"chaitanya_{ts}@campuslab.dev"
    name1 = "Chaitanya Tester"
    avatar1 = "https://avatars.githubusercontent.com/u/193857698?v=4"

    # 1. Legacy Password Endpoints Retired (HTTP 410 Gone)
    status, body, _ = http_request("POST", "/api/v1/auth/signup", {"name": "Legacy", "password": "pass"})
    assert_test("Legacy password signup returns 410 Gone", status == 410)
    assert_test("Friendly retirement message returned on signup", "retired" in body.get("message", "").lower())

    status, body, _ = http_request("POST", "/api/v1/auth/login", {"prn": "legacy", "password": "pass"})
    assert_test("Legacy password login returns 410 Gone", status == 410)
    assert_test("Friendly retirement message returned on login", "retired" in body.get("message", "").lower())

    # 2. Primary OAuth User Authentication (GitHub)
    status, body, meta = http_request("POST", "/api/v1/auth/oauth", {
        "provider": "github",
        "email": email1,
        "name": name1,
        "avatar": avatar1
    })
    assert_test("Primary OAuth login returns 200", status == 200)
    assert_test("OAuth login returns JWT token", "token" in body and len(body["token"]) > 30)
    assert_test("OAuth returns user object with matching email", body.get("user", {}).get("email") == email1)
    assert_test("OAuth returns user object with matching name", body.get("user", {}).get("name") == name1)
    assert_test("OAuth returns user object with matching avatar", body.get("user", {}).get("avatar") == avatar1)
    assert_test("OAuth sets token in HttpOnly cookie", "token=" in meta.get("cookie", ""))

    token1 = body.get("token", "")
    user_id1 = body.get("user", {}).get("id", "")

    # 3. Privilege Escalation Defense (role cannot be hijacked)
    email_attacker = f"attacker_{ts}@github.com"
    status, body, _ = http_request("POST", "/api/v1/auth/oauth", {
        "provider": "github",
        "email": email_attacker,
        "name": "Attacker",
        "role": "SUPERADMIN",
        "isAdmin": True
    })
    assert_test("Attacker OAuth signup returns 200", status == 200)
    assert_test("Role cannot be escalated via payload (remains 'USER')", body.get("user", {}).get("role") == "USER")

    # 4. Unicode Name & Emoji Support
    email_unicode = f"rene_{ts}@github.com"
    status, body, _ = http_request("POST", "/api/v1/auth/oauth", {
        "provider": "github",
        "email": email_unicode,
        "name": "René Descartes 👨‍💻"
    })
    assert_test("OAuth with UTF-8 name returns 200", status == 200)
    assert_test("UTF-8 name preserved correctly", body.get("user", {}).get("name") == "René Descartes 👨‍💻")

    # 5. Idempotent OAuth Login (re-login returns existing account)
    status, body_second, _ = http_request("POST", "/api/v1/auth/oauth", {
        "provider": "github",
        "email": email1,
        "name": name1
    })
    assert_test("Existing OAuth login returns 200 without duplicate entry", status == 200)
    assert_test("User ID matches existing account", body_second.get("user", {}).get("id") == user_id1)

    # 6. Google OAuth Provider Flow
    email_google = f"google_{ts}@gmail.com"
    status, body_google, _ = http_request("POST", "/api/v1/auth/oauth", {
        "provider": "google",
        "email": email_google,
        "name": "Google Dev"
    })
    assert_test("Google OAuth login returns 200", status == 200)
    assert_test("Google provider recorded correctly", body_google.get("user", {}).get("provider") == "google")

    # 7. Fallback Email Generation when omitted
    status, body_fallback, _ = http_request("POST", "/api/v1/auth/oauth", {"provider": "google"})
    assert_test("OAuth without email returns 200 with fallback email", status == 200)
    assert_test("Fallback email generated with provider domain", "google_user@campuslab.dev" in body_fallback.get("user", {}).get("email", ""))

    # 8. GET /api/v1/auth/me Authentication Variants
    status, body, _ = http_request("GET", "/api/v1/auth/me", token=token1)
    assert_test("GET /api/v1/auth/me with Bearer token returns 200", status == 200)
    assert_test("GET /api/v1/auth/me returns current user profile", body.get("user", {}).get("id") == user_id1)

    status, body, _ = http_request("GET", "/api/v1/auth/me", cookie=f"token={token1}")
    assert_test("GET /api/v1/auth/me with Cookie header returns 200", status == 200)

    status, body, _ = http_request("GET", "/api/v1/auth/me")
    assert_test("GET /api/v1/auth/me without any token returns 401", status == 401)

    status, body, _ = http_request("GET", "/api/v1/auth/me", headers_override={"Authorization": "Bearer "})
    assert_test("GET /api/v1/auth/me with empty Bearer returns 401", status == 401)

    status, body, _ = http_request("GET", "/api/v1/auth/me", headers_override={"Authorization": "Basic dXNlcjpwYXNz"})
    assert_test("GET /api/v1/auth/me with non-Bearer header returns 401", status == 401)

    status, body, _ = http_request("GET", "/api/v1/auth/me", token="fake.tampered.token")
    assert_test("GET /api/v1/auth/me with invalid signature returns 401", status == 401)

    # 9. Logout (Idempotent cookie clearance)
    status, body, meta = http_request("POST", "/api/v1/auth/logout")
    assert_test("POST /api/v1/auth/logout returns 200", status == 200)
    assert_test("Logout clears cookie with Max-Age=0", "Max-Age=0" in meta.get("cookie", ""))

    return token1, user_id1

# ==============================================================================
# SECTION 3: PROBLEMS CATALOG & FILTERING
# ==============================================================================
def test_problems_catalog(token):
    log_header("SECTION 3: PROBLEMS CATALOG & FILTERING")

    # 1. Unauthenticated Problem List
    status, body_unauth, _ = http_request("GET", "/api/v1/problems")
    assert_test("Unauthenticated GET /api/v1/problems returns 200", status == 200)
    problems = body_unauth.get("problems", [])
    assert_test("Catalog contains all 270 DSA problems", len(problems) == 270, f"Count: {len(problems)}")

    p_sample = problems[0]
    assert_test("Unauthenticated problem status defaults to 'Unsolved'", p_sample.get("status") == "Unsolved")
    assert_test("Unauthenticated submissionCount defaults to 0", p_sample.get("submissionCount") == 0)

    # 2. Schema Integrity on all 270 problems
    difficulties = set()
    all_valid = True
    for p in problems:
        if not (p.get("id") and p.get("title") and p.get("difficulty") and isinstance(p.get("tags"), list)):
            all_valid = False
            break
        difficulties.add(p["difficulty"])
    assert_test("All 270 problems conform to ProblemSummary schema", all_valid)
    assert_test("Standard difficulties present ('Easy', 'Medium', 'Hard')", difficulties == {"Easy", "Medium", "Hard"})

    # 3. Authenticated Problem List
    status, body_auth, _ = http_request("GET", "/api/v1/problems", token=token)
    assert_test("Authenticated GET /api/v1/problems returns 200", status == 200)

    # 4. GET /api/v1/problems/:id Valid ID
    target_pid = p_sample["id"]
    status, body, _ = http_request("GET", f"/api/v1/problems/{target_pid}", token=token)
    assert_test("GET /api/v1/problems/:id with valid ID returns 200", status == 200)
    p_detail = body.get("problem", {})
    assert_test("Problem detail has description", len(p_detail.get("description", "")) > 10)
    assert_test("Problem detail has examples list", isinstance(p_detail.get("examples"), list))
    assert_test("Problem detail has hidden testcases list", len(p_detail.get("testcases", [])) > 0)
    assert_test("Problem detail has starterCodes object with cpp", "cpp" in p_detail.get("starterCodes", {}))
    assert_test("Problem detail has referenceSolutions object with cpp", "cpp" in p_detail.get("referenceSolutions", {}))

    # 5. Non-existent & Malformed UUIDs
    status, _, _ = http_request("GET", "/api/v1/problems/00000000-0000-0000-0000-000000000000", token=token)
    assert_test("Non-existent UUID returns 404", status == 404)

    status, _, _ = http_request("GET", "/api/v1/problems/invalid-non-uuid-string", token=token)
    assert_test("Invalid string UUID returns 404 safely", status == 404)

    status, _, _ = http_request("GET", "/api/v1/problems/'%20OR%201=1--", token=token)
    assert_test("SQL injection in problem URL returns 404 safely", status == 404)

    return target_pid, p_detail

# ==============================================================================
# SECTION 4: SANDBOX EXECUTION EXHAUSTIVE TESTING
# ==============================================================================
def test_sandbox_execution(token):
    log_header("SECTION 4: SANDBOX EXECUTION EXHAUSTIVE TESTING")

    # 1. Unauthenticated run attempt
    status, _, _ = http_request("POST", "/api/v1/code-execution/run", {"sourceCode": "int main(){}"})
    assert_test("Unauthenticated run attempt returns 401", status == 401)

    # 2. Empty source code
    status, _, _ = http_request("POST", "/api/v1/code-execution/run", {"sourceCode": ""}, token=token)
    assert_test("Empty source code returns 400", status == 400)

    status, _, _ = http_request("POST", "/api/v1/code-execution/run", {}, token=token)
    assert_test("Missing sourceCode field returns 400", status == 400)

    # 3. Standard C++ I/O (cin/cout) with 3 test cases
    code_adder = """
    #include <iostream>
    using namespace std;
    int main() {
        long long a, b;
        while(cin >> a >> b) {
            cout << (a + b) << endl;
        }
        return 0;
    }
    """
    status, body, _ = http_request("POST", "/api/v1/code-execution/run", {
        "sourceCode": code_adder,
        "testcases": [
            {"input": "10 20\n", "output": "30\n"},
            {"input": "-5 15\n", "output": "10\n"},
            {"input": "1000000 2000000\n", "output": "3000000\n"}
        ]
    }, token=token)
    assert_test("Valid C++ run returns 200", status == 200)
    exec_data = body.get("execution", {})
    assert_test("All 3 testcases passed", exec_data.get("allPassed") is True)
    assert_test("Execution time measured", len(exec_data.get("results", [])) == 3)

    # 4. Custom testcase without expected output
    status, body, _ = http_request("POST", "/api/v1/code-execution/run", {
        "sourceCode": code_adder,
        "testcases": [{"input": "42 58\n"}]
    }, token=token)
    assert_test("Testcase without expected output runs and succeeds", status == 200)
    first_res = body.get("execution", {}).get("results", [{}])[0]
    assert_test("Stdout captured correctly ('100')", "100" in first_res.get("stdout", ""))

    # 5. Compilation Error: Missing semicolon
    code_syntax_err = """
    #include <iostream>
    int main() {
        std::cout << "Hello"
        return 0;
    }
    """
    status, body, _ = http_request("POST", "/api/v1/code-execution/run", {
        "sourceCode": code_syntax_err,
        "testcases": [{"input": ""}]
    }, token=token)
    assert_test("Syntax error returns 200 with compilation verdict", status == 200)
    exec_data = body.get("execution", {})
    assert_test("allPassed is false on compilation error", exec_data.get("allPassed") is False)
    compile_res = exec_data.get("results", [{}])[0]
    assert_test("Status is 'Compilation Error'", compile_res.get("status") == "Compilation Error")
    assert_test("Diagnostic output captured in compileOutput", "expected ';' before 'return'" in compile_res.get("compileOutput", ""))

    # 6. Compilation Error: Missing main function (linker failure)
    code_no_main = """
    #include <iostream>
    void helper() { std::cout << "no main"; }
    """
    status, body, _ = http_request("POST", "/api/v1/code-execution/run", {
        "sourceCode": code_no_main,
        "testcases": [{"input": ""}]
    }, token=token)
    assert_test("Missing main() returns Compilation Error", status == 200 and body.get("execution", {}).get("results", [{}])[0].get("status") == "Compilation Error")

    # 7. Time Limit Exceeded (TLE) - Infinite Loop
    code_tle = """
    int main() {
        volatile int count = 0;
        while(true) { count++; }
        return 0;
    }
    """
    status, body, _ = http_request("POST", "/api/v1/code-execution/run", {
        "sourceCode": code_tle,
        "testcases": [{"input": ""}]
    }, token=token)
    assert_test("Infinite loop caught as Time Limit Exceeded", status == 200 and body.get("execution", {}).get("results", [{}])[0].get("status") == "Time Limit Exceeded")

    # 8. Runtime Error - Division by Zero (SIGFPE)
    code_div0 = """
    #include <iostream>
    int main() {
        volatile int a = 10, b = 0;
        std::cout << (a / b) << std::endl;
        return 0;
    }
    """
    status, body, _ = http_request("POST", "/api/v1/code-execution/run", {
        "sourceCode": code_div0,
        "testcases": [{"input": ""}]
    }, token=token)
    assert_test("Division by zero caught as Runtime Error", status == 200 and body.get("execution", {}).get("results", [{}])[0].get("status") == "Runtime Error")

    # 9. Runtime Error - Null Pointer Dereference (SIGSEGV)
    code_segfault = """
    int main() {
        int* ptr = nullptr;
        *ptr = 999;
        return 0;
    }
    """
    status, body, _ = http_request("POST", "/api/v1/code-execution/run", {
        "sourceCode": code_segfault,
        "testcases": [{"input": ""}]
    }, token=token)
    assert_test("Null pointer dereference caught as Runtime Error", status == 200 and body.get("execution", {}).get("results", [{}])[0].get("status") == "Runtime Error")

    # 10. Runtime Error - Out of Bounds Vector Exception
    code_oob = """
    #include <vector>
    int main() {
        std::vector<int> v;
        return v.at(100);
    }
    """
    status, body, _ = http_request("POST", "/api/v1/code-execution/run", {
        "sourceCode": code_oob,
        "testcases": [{"input": ""}]
    }, token=token)
    assert_test("std::out_of_range unhandled exception caught as Runtime Error", status == 200 and body.get("execution", {}).get("results", [{}])[0].get("status") == "Runtime Error")

    # 11. Security Sandbox - Process Limit / Fork Bomb Resilience
    code_forkbomb = """
    #include <unistd.h>
    int main() {
        while(true) { fork(); }
        return 0;
    }
    """
    status, body, _ = http_request("POST", "/api/v1/code-execution/run", {
        "sourceCode": code_forkbomb,
        "testcases": [{"input": ""}]
    }, token=token)
    assert_test("Fork bomb safely contained by sandbox without hanging server", status == 200)

# ==============================================================================
# SECTION 5: SUBMISSIONS & JUDGE ENGINE DEEP DIVE
# ==============================================================================
def test_submissions_deep_dive(token, problem_id, p_detail):
    log_header("SECTION 5: SUBMISSIONS & JUDGE ENGINE DEEP DIVE")

    # 1. Unauthenticated Submission
    status, _, _ = http_request("POST", "/api/v1/submission/submit", {
        "problemId": problem_id,
        "sourceCode": "int main(){}"
    })
    assert_test("Unauthenticated submission returns 401", status == 401)

    # 2. Missing Fields
    status, _, _ = http_request("POST", "/api/v1/submission/submit", {"sourceCode": "int main(){}"}, token=token)
    assert_test("Submission missing problemId returns 400", status == 400)

    status, _, _ = http_request("POST", "/api/v1/submission/submit", {"problemId": problem_id}, token=token)
    assert_test("Submission missing sourceCode returns 400", status == 400)

    # 3. Non-existent Problem ID
    status, _, _ = http_request("POST", "/api/v1/submission/submit", {
        "problemId": "00000000-0000-0000-0000-000000000000",
        "sourceCode": "int main(){}"
    }, token=token)
    assert_test("Submission for non-existent problem returns 404", status == 404)

    # 4. Wrong Answer Submission against Hidden Testcases
    flawed_code = """
    #include <iostream>
    using namespace std;
    int main() {
        // Output completely wrong values
        cout << "-999999" << endl;
        return 0;
    }
    """
    status, body_wa, _ = http_request("POST", "/api/v1/submission/submit", {
        "problemId": problem_id,
        "sourceCode": flawed_code
    }, token=token)
    assert_test("Flawed submission evaluated with 201", status == 201)
    wa_sub = body_wa.get("submission", {})
    assert_test("Status is marked 'Wrong Answer'", wa_sub.get("status") == "Wrong Answer")
    assert_test("Individual testcases returned with passed=false flags", any(tc["passed"] is False for tc in wa_sub.get("testcases", [])))
    wa_sub_id = wa_sub.get("id", "")

    # 5. Accepted Submission (Reference Solution for problem)
    ac_code = p_detail.get("referenceSolutions", {}).get("cpp", "")
    status, body_ac, _ = http_request("POST", "/api/v1/submission/submit", {
        "problemId": problem_id,
        "sourceCode": ac_code
    }, token=token)
    assert_test("Correct submission returns 201", status == 201)
    ac_sub = body_ac.get("submission", {})
    assert_test("Status is marked 'Accepted'", ac_sub.get("status") == "Accepted")
    assert_test("Execution allPassed is true", body_ac.get("execution", {}).get("allPassed") is True)
    ac_sub_id = ac_sub.get("id", "")

    # 6. Fetch submission by ID
    status, body_fetch, _ = http_request("GET", f"/api/v1/submission/{ac_sub_id}", token=token)
    assert_test("GET /api/v1/submission/:id returns 200", status == 200)
    fetched = body_fetch.get("submission", {})
    assert_test("Fetched submission matches ID and status", fetched.get("id") == ac_sub_id and fetched.get("status") == "Accepted")
    assert_test("TestCaseResult rows persisted in DB", len(fetched.get("testcases", [])) > 0)

    # 7. Fetch non-existent submission
    status, _, _ = http_request("GET", "/api/v1/submission/00000000-0000-0000-0000-000000000000", token=token)
    assert_test("GET /api/v1/submission/:id for non-existent UUID returns 404", status == 404)

    # 8. User Submissions History for Problem
    status, body_hist, _ = http_request("GET", f"/api/v1/submission/problem/{problem_id}", token=token)
    assert_test("GET /api/v1/submission/problem/:id returns 200", status == 200)
    hist = body_hist.get("submissions", [])
    assert_test("Submissions history contains at least 2 entries (WA & AC)", len(hist) >= 2)
    assert_test("History entries specify language 'C++ (GCC 13)'", all(s.get("language") == "C++ (GCC 13)" for s in hist))

    # 9. Alias endpoint POST /api/v1/submission
    status, body_alias, _ = http_request("POST", "/api/v1/submission", {
        "problemId": problem_id,
        "sourceCode": ac_code
    }, token=token)
    assert_test("Alias POST /api/v1/submission returns 201", status == 201)

    return ac_sub_id

# ==============================================================================
# SECTION 6: CONTEST ROOMS & LIVE MULTI-USER LEADERBOARD
# ==============================================================================
def test_contest_rooms_deep_dive(token1, user_id1):
    log_header("SECTION 6: CONTEST ROOMS & LIVE MULTI-USER LEADERBOARD")

    # 1. Unauthenticated creation
    status, _, _ = http_request("POST", "/api/v1/contests/rooms", {"questionCount": 3})
    assert_test("Unauthenticated contest room creation returns 401", status == 401)

    # 2. Validation: Unreachable question count
    status, _, _ = http_request("POST", "/api/v1/contests/rooms", {
        "questionCount": 9999,
        "topics": ["arrays"]
    }, token=token1)
    assert_test("Question count exceeding available problems returns 400", status == 400)

    # 3. Topic Plural / Singular tolerance
    status, body_sing, _ = http_request("POST", "/api/v1/contests/rooms", {
        "questionCount": 2,
        "timeLimitMinutes": 30,
        "topics": ["array"]  # singular topic
    }, token=token1)
    assert_test("Contest creation with singular topic 'array' succeeds (201)", status == 201)

    # 4. Valid Room Creation (with maxParticipants=5)
    status, body_room, _ = http_request("POST", "/api/v1/contests/rooms", {
        "questionCount": 3,
        "timeLimitMinutes": 60,
        "maxParticipants": 5,
        "topics": ["arrays"]
    }, token=token1)
    assert_test("Valid contest room creation returns 201", status == 201)
    room = body_room.get("room", {})
    room_code = room.get("code", "")
    assert_test("Room code is 6-character alphanumeric uppercase", len(room_code) == 6 and room_code.isupper())
    assert_test("startsAt is populated", len(room.get("startsAt", "")) > 10)
    assert_test("endsAt is populated", len(room.get("endsAt", "")) > 10)
    assert_test("Exactly 3 questions assigned with points (100, 200, 300)", len(room.get("questions", [])) == 3)
    assert_test("Host automatically registered in participants & leaderboard", room.get("participantCount") == 1)

    # 5. Case-insensitive room code retrieval
    status, body_get_upper, _ = http_request("GET", f"/api/v1/contests/rooms/{room_code}", token=token1)
    assert_test("GET /api/v1/contests/rooms/:code uppercase returns 200", status == 200)

    status, body_get_lower, _ = http_request("GET", f"/api/v1/contests/rooms/{room_code.lower()}", token=token1)
    assert_test("GET /api/v1/contests/rooms/:code lowercase returns 200 (case-insensitive)", status == 200)

    # 6. Unauthenticated vs Authenticated meJoined flag
    status, body_unauth_room, _ = http_request("GET", f"/api/v1/contests/rooms/{room_code}")
    assert_test("Unauthenticated room fetch has meJoined=false", body_unauth_room.get("room", {}).get("meJoined") is False)

    assert_test("Authenticated host room fetch has meJoined=true", body_get_upper.get("room", {}).get("meJoined") is True)

    # 7. Non-existent room code
    status, _, _ = http_request("GET", "/api/v1/contests/rooms/NOCODE99", token=token1)
    assert_test("Non-existent room code returns 404", status == 404)

    # 8. Competitor (User 2) Joins Room
    ts = int(time.time() * 1000)
    _, u2_body, _ = http_request("POST", "/api/v1/auth/oauth", {
        "provider": "google",
        "name": "Alex Rival",
        "email": f"rival_{ts}@google.com"
    })
    token2 = u2_body.get("token", "")
    user_id2 = u2_body.get("user", {}).get("id", "")

    status, body_join, _ = http_request("POST", f"/api/v1/contests/rooms/{room_code}/join", token=token2)
    assert_test("Competitor joins room returns 200", status == 200)
    assert_test("Participant count incremented to 2", body_join.get("room", {}).get("participantCount") == 2)
    assert_test("Leaderboard contains both participants", len(body_join.get("room", {}).get("leaderboard", [])) == 2)

    # 9. Idempotent Join (Re-joining doesn't duplicate)
    status, body_rejoin, _ = http_request("POST", f"/api/v1/contests/rooms/{room_code}/join", token=token2)
    assert_test("Re-joining is idempotent (200)", status == 200)
    assert_test("Participant count remains 2 without duplicates", body_rejoin.get("room", {}).get("participantCount") == 2)

    # 10. Capacity Limit Enforcement
    status, body_cap, _ = http_request("POST", "/api/v1/contests/rooms", {
        "questionCount": 2,
        "timeLimitMinutes": 30,
        "maxParticipants": 1
    }, token=token1)
    cap_code = body_cap.get("room", {}).get("code", "")
    status, body_rej, _ = http_request("POST", f"/api/v1/contests/rooms/{cap_code}/join", token=token2)
    assert_test("Joining room with maxParticipants reached rejected with 400", status == 400)
    assert_test("Room full message returned", "full" in body_rej.get("message", "").lower())

    # 11. Live Contest Submission & Scoring
    # Use known accepted Reverse Array problem
    rev_id = "9f176cb9-d457-4dd6-8866-77d43bc5f3f2"
    _, rev_detail, _ = http_request("GET", f"/api/v1/problems/{rev_id}", token=token2)
    rev_code = rev_detail.get("problem", {}).get("referenceSolutions", {}).get("cpp", "")

    status, body_sub, _ = http_request("POST", "/api/v1/submission/submit", {
        "problemId": rev_id,
        "sourceCode": rev_code,
        "contestCode": room_code
    }, token=token2)
    assert_test("Competitor submits contest solution (Accepted)", body_sub.get("submission", {}).get("status") == "Accepted")

    # Verify leaderboard updated immediately
    status, body_lb, _ = http_request("GET", f"/api/v1/contests/rooms/{room_code}", token=token2)
    lb = body_lb.get("room", {}).get("leaderboard", [])
    u2_entry = next((item for item in lb if item["userId"] == user_id2), None)
    assert_test("Competitor score updated on leaderboard (> 0)", u2_entry is not None and u2_entry.get("score", 0) > 0)
    assert_test("Competitor solved count incremented to 1", u2_entry is not None and u2_entry.get("solved") == 1)
    assert_test("Competitor lastAcceptedAt timestamp recorded", u2_entry is not None and u2_entry.get("lastAcceptedAt") is not None)

    # 12. Idempotent Scoring (Submitting Accepted again does NOT give double points)
    prev_score = u2_entry.get("score", 0)
    status, _, _ = http_request("POST", "/api/v1/submission/submit", {
        "problemId": rev_id,
        "sourceCode": rev_code,
        "contestCode": room_code
    }, token=token2)
    status, body_lb2, _ = http_request("GET", f"/api/v1/contests/rooms/{room_code}", token=token2)
    u2_entry2 = next((item for item in body_lb2.get("room", {}).get("leaderboard", []) if item["userId"] == user_id2), None)
    assert_test("Submitting accepted solution twice does NOT double score", u2_entry2.get("score") == prev_score)

# ==============================================================================
# SECTION 7: PROFILE ANALYTICS & DYNAMIC STATS
# ==============================================================================
def test_profile_analytics(token1):
    log_header("SECTION 7: PROFILE ANALYTICS & DYNAMIC STATS")

    # 1. Unauthenticated access
    status, _, _ = http_request("GET", "/api/v1/profile/me")
    assert_test("Unauthenticated profile access returns 401", status == 401)

    # 2. Authenticated access
    status, body, _ = http_request("GET", "/api/v1/profile/me", token=token1)
    assert_test("GET /api/v1/profile/me returns 200", status == 200)
    profile = body.get("profile", {})

    # User Section
    u = profile.get("user", {})
    assert_test("Profile contains valid user id & email", bool(u.get("id")) and bool(u.get("email")))

    # Stats Section
    stats = profile.get("stats", {})
    assert_test("totalSolved is positive integer", stats.get("totalSolved", 0) >= 1)

    by_diff = stats.get("byDifficulty", [])
    assert_test("byDifficulty has Easy, Medium, Hard breakdown", len(by_diff) == 3)
    diff_names = [d.get("name") for d in by_diff]
    assert_test("All 3 difficulties represented", diff_names == ["Easy", "Medium", "Hard"])

    total_available_probs = sum(d.get("total", 0) for d in by_diff)
    assert_test("Sum of difficulty totals equals 270 DSA problems", total_available_probs == 270, f"Total: {total_available_probs}")

    # Recent Submissions Section
    recent = profile.get("recentSubmissions", [])
    assert_test("recentSubmissions contains recent entries", len(recent) > 0)
    first_recent = recent[0]
    assert_test("Recent submission has title, difficulty, status",
                all(k in first_recent for k in ("title", "difficulty", "status", "language", "createdAt")))
    assert_test("Recent submission language is 'C++ (GCC 13)'", first_recent.get("language") == "C++ (GCC 13)")

# ==============================================================================
# SECTION 8: CONCURRENCY, STRESS & CONNECTION POOLING
# ==============================================================================
def test_concurrency_and_stress(token1):
    log_header("SECTION 8: CONCURRENCY, STRESS & CONNECTION POOLING")

    # 1. Rapid successive requests across threads (Tests DB Pool Under Load)
    print(" [*] Dispatching 30 concurrent requests to /api/v1/problems...")
    def fetch_problems():
        status, _, _ = http_request("GET", "/api/v1/problems", token=token1)
        return status == 200

    with ThreadPoolExecutor(max_workers=10) as executor:
        results = list(executor.map(lambda _: fetch_problems(), range(30)))

    assert_test("All 30 concurrent catalog requests succeeded with 200", all(results))

    # 2. Concurrent auth verification requests
    print(" [*] Dispatching 20 concurrent requests to /api/v1/auth/me...")
    def fetch_me():
        status, _, _ = http_request("GET", "/api/v1/auth/me", token=token1)
        return status == 200

    with ThreadPoolExecutor(max_workers=10) as executor:
        me_results = list(executor.map(lambda _: fetch_me(), range(20)))

    assert_test("All 20 concurrent /auth/me requests succeeded with 200", all(me_results))

    # 3. Concurrent sandbox executions
    print(" [*] Dispatching 4 simultaneous C++ sandbox executions...")
    simple_cpp = "#include <iostream>\nint main(){ std::cout << 42; return 0; }"
    def run_sandbox():
        status, b, _ = http_request("POST", "/api/v1/code-execution/run", {
            "sourceCode": simple_cpp,
            "testcases": [{"input": ""}]
        }, token=token1)
        return status == 200 and b.get("execution", {}).get("allPassed") is True

    with ThreadPoolExecutor(max_workers=4) as executor:
        sandbox_results = list(executor.map(lambda _: run_sandbox(), range(4)))

    assert_test("All 4 concurrent sandbox executions succeeded in Isolate", all(sandbox_results))

# ==============================================================================
# MASTER TEST RUNNER
# ==============================================================================
def main():
    print(f"{BOLD}{GREEN}")
    print("====================================================================")
    print("   Campus Lab - Master Automated Integration Test Suite             ")
    print("====================================================================")
    print(f"{RESET}")

    start_time = time.time()

    test_system_health_and_cors()
    token1, user_id1 = test_authentication_deep_dive()
    problem_id, p_detail = test_problems_catalog(token1)
    test_sandbox_execution(token1)
    test_submissions_deep_dive(token1, problem_id, p_detail)
    test_contest_rooms_deep_dive(token1, user_id1)
    test_profile_analytics(token1)
    test_concurrency_and_stress(token1)

    elapsed = time.time() - start_time

    log_header("TEST SUITE EXECUTION SUMMARY")
    print(f"Total Test Assertions Executed : {BOLD}{total_tests}{RESET}")
    print(f"Assertions Passed              : {BOLD}{GREEN}{passed_tests}{RESET}")
    print(f"Assertions Failed              : {BOLD}{RED}{failed_tests}{RESET}")
    print(f"Total Execution Time           : {BOLD}{elapsed:.2f}s{RESET}")

    if failed_tests == 0:
        print(f"\n{BOLD}{GREEN}🎉 100% OF INTEGRATION TESTS PASSED WITH ZERO FAILURES! 🎉{RESET}\n")
        sys.exit(0)
    else:
        print(f"\n{BOLD}{RED}❌ SOME INTEGRATION TESTS FAILED ({failed_tests} failed). ❌{RESET}\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
