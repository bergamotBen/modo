SELECT id, status_code, content, error_msg, created
FROM net._http_response
ORDER BY created DESC
LIMIT 3;