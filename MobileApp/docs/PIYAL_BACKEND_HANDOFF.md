# Piyal Backend Handoff

## Architecture
- `lib/core/data/repositories.dart`: abstract repository interfaces + Riverpod providers (keepAlive).
- `lib/core/data/mock_repositories.dart`: mock implementations used until backend ready.
- `lib/core/domain/tg_models.dart`, `tg_enums.dart`: domain models/enums.
- `lib/features/assessments`, `applications`, `notifications`: UI screens.

## Endpoint Mapping
- Assessments: GET /api/v1/assessments; POST /api/v1/assessments/:id/submit
- Applications: GET /api/v1/applications; GET /api/v1/applications/:id/percentiles
- Notifications: GET /api/v1/notifications; POST /api/v1/notifications/:id/read; POST /api/v1/notifications/read-all

## Swap Steps
1. Implement Dio-backed repos.
2. Replace provider returns in repositories.dart.
3. Keep keepAlive.
4. Run tests.
