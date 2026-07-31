CREATE TABLE services (
    id INTEGER PRIMARY KEY 
    AUTOINCREMENT,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT
    CURRENT_TIMESTAMP
);

CREATE TABLE checks ( 
    id INTEGER PRIMARY KEY
    AUTOINCREMENT,
    service_id INTEGER NOT NULL,
    status_code INTEGER,
    response_time_ms INTEGER,
    is_up BOOLEAN,
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id)
);

