import requests
import sqlite3
import time 
from datetime import datetime

DB_PATH = "devmonitor.db"

def get_services(conn):
    cur = conn.cursor()
    cur.execute("SELECT id, name, url FROM services")
    return cur.fetchall()

def check_service(url):
    start = time.time()
    try:
        response = requests.get(url, timeout=5)
        elapsed_ms = int((time.time() - start) * 1000)
        return response.status_code, elapsed_ms, response.status_code < 400
    except requests.RequestException:
        elapsed_ms = int((time.time() - start) * 1000)
        return None, elapsed_ms, False

def save_check(conn, service_id, status_code, elapsed_ms, is_up):
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO checks (service_id, status_code, response_time_ms, is_up) VALUES (?, ?, ?, ?)",
        (service_id, status_code, elapsed_ms, is_up)
    )
    conn.commit()

def run():
    conn = sqlite3.connect(DB_PATH)
    services = get_services(conn)
    for service_id, name, url in services:
        status_code, elapsed_ms, is_up = check_service(url)
        save_check(conn, service_id, status_code, elapsed_ms, is_up)
        print(f"[{datetime.now()}] {name} -> {'UP' if is_up else 'DOWN'} ({elapsed_ms}ms)")
    conn.close()

if __name__ == "__main__":
    run()

