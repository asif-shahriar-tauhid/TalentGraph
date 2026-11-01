# T03 — Core: config, Dio, secure token store, failures
Read: `docs/api/auth-contract.md` §1–§3, §6; `docs/api/observed-responses.md` (STOP if T00 not done).
Do:
1. `core/config/app_config.dart`: `API_BASE_URL` via `--dart-define` (default `http://10.0.2.2:5000/api/v1`; confirm port with owner). No secrets.
2. `core/error/app_failure.dart`: sealed per contract §6 (canceled, denied, expired, failed, accountUnavailable, accessDenied, server, network, unauthorized). Safe `message` getter; never include server body/`stack`.
3. `core/storage/token_store.dart`: interface + `SecureTokenStore` (flutter_secure_storage), read/write/clear.
4. `core/network/dio_client.dart`: provider, timeouts, envelope unwrap in one place (`data`), redacting logger, Bearer interceptor, **single-flight** refresh via `POST /auth/refresh-token {refreshToken}` (refresh call bypasses interceptor); refresh failure → clear tokens + emit unauthorized.
Accept: tests with a fake adapter — header attached; concurrent 401s → exactly one refresh; refresh failure clears tokens; 400/403/502/network map correctly; no token or `stack` in logs.
