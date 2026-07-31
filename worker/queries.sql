SELECT * FROM checks WHERE service_id = 1 ORDER BY checked_at DESC LIMIT 10;

SELECT service_id,
       ROUND(100.0 * SUM(is_up) / COUNT(*), 2) AS uptime_percent
FROM checks
GROUP BY service_id;
