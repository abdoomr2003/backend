## Weather API Wrapper Service

Node.js/Express service that wraps a third‑party weather API and adds Redis caching to reduce upstream calls. It exposes a simple REST endpoint to fetch weather data for a given location.

### Features
- **Express REST API** under `GET /api/v1/weather/:location`
- **Redis caching** to minimize external API requests (default TTL 180s)
- **Configurable via environment variables**
- **Structured logging** via `morgan`

### Tech Stack
- Node.js, Express
- Axios (HTTP client)
- Redis (cache)
- Morgan (HTTP logging)

---

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Redis server accessible from this service

You can run Redis locally or via Docker:

```bash
docker run -d --name weather-redis -p 6379:6379 redis:7-alpine
```

### Clone and Install

```bash
git clone <your-repo-url>
cd backend/backend/weather-api-wrapper-service
npm install
```

### Configure Environment

Create a `.env` file at `backend/backend/weather-api-wrapper-service/.env` (the server loads this exact path):

```bash
cp .env.example .env
```

Or create it manually with the following variables:

```bash
# Server
PORT=3000

# Upstream Weather API
# Example: BASEURL=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
BASEURL=
APIKEY=

# Redis (optional, defaults to localhost if not set by the client library)
# Common formats:
# REDIS_URL=redis://localhost:6379
# REDIS_HOST=localhost
# REDIS_PORT=6379
```

Notes:
- The service requires both `BASEURL` and `APIKEY`. If either is missing, requests will fail.
- The code currently creates the Redis client without explicit URL config; set standard Redis environment variables supported by `redis` if your setup differs (e.g., `REDIS_URL`).

### Run

```bash
# From backend/backend/weather-api-wrapper-service
node server.js
```

You should see logs similar to:

```
redis connected successfully
server is runnig on 3000
```

---

## API

### Get Weather by Location

```http
GET /api/v1/weather/:location
```

Path params:
- `location`: String accepted by the upstream API (e.g., `Seattle`, `Austin,TX`, `40.7128,-74.0060`).

Query params (forwarded to upstream with defaults):
- `unitGroup`: Defaults to `us`
- `contentType`: Defaults to `json`

Request example:

```bash
curl -s "http://localhost:3000/api/v1/weather/Seattle"
```

Successful response shape:

```json
{
  "cached": false,
  "data": { /* upstream API JSON */ }
}
```

If the response is served from cache:

```json
{
  "cached": true,
  "data": { /* cached upstream JSON */ }
}
```

Error response example (e.g., missing env vars, upstream failure):

```json
{
  "error": "Data unavailable",
  "message": "Failed to fetch from API: <details>"
}
```

Health/root endpoint:

```http
GET /
```

Returns a simple JSON message.

---

## Caching Behavior

- Cache key: the exact `:location` path parameter string
- Store policy: `NX=true` (only set if absent)
- TTL: 180 seconds (configurable in code via `saveToCache`)
- Flow:
  - Middleware `cacheMiddleware` checks Redis first and short‑circuits the response if found.
  - If not in cache, the controller fetches from the upstream API, stores it in Redis, and returns the data.

---

## Configuration & Environment

These variables are read at runtime:

- **PORT**: HTTP server port (default `3000`).
- **BASEURL**: Upstream base URL, e.g., `https://.../timeline/`. The service appends the encoded `:location` to this base.
- **APIKEY**: Upstream API key.
- **Redis**: The client is created via `redis.createClient()`; configure via `REDIS_URL` or host/port variables supported by the `redis` package if not localhost.

Security note: Do not commit real API keys. Use a `.env` file or secret manager.

---

## Project Structure

```
backend/backend/weather-api-wrapper-service/
├── server.js
├── src/
│   ├── config/
│   │   └── redis.js
│   ├── controllers/
│   │   └── weatherController.js
│   ├── middleware/
│   │   └── cacheMiddleware.js
│   ├── models/
│   │   └── weatherModel.js
│   └── routes/
│       └── weatherRoutes.js
└── README.md
```

---

## Local Development

Recommended workflows:

- Use `morgan` logs (already enabled) to inspect requests.
- Adjust cache TTL in `src/models/weatherModel.js` if needed.
- If modifying Redis connection settings, update `src/config/redis.js` to read from env.

### Hot Reload (optional)
If you prefer hot reload, install nodemon and run with it:

```bash
npm install --save-dev nodemon
npx nodemon server.js
```

---

## Troubleshooting

- "Failed to start server: Error: connect ECONNREFUSED 127.0.0.1:6379"
  - Ensure Redis is running and accessible; set `REDIS_URL` if not on localhost.

- "Missing required environment variables: BASEURL or APIKEY"
  - Check your `.env` file path and values. The app loads from `backend/backend/weather-api-wrapper-service/.env` explicitly.

- Upstream 4xx/5xx responses
  - The service logs upstream error details (status, statusText, body). Verify `BASEURL`, `APIKEY`, and `:location` formatting expected by your provider.

---

## Example .env

```bash
PORT=3000

# Visual Crossing example
BASEURL=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
APIKEY=<your_visual_crossing_api_key>

# If using non-default Redis
# REDIS_URL=redis://localhost:6379
```

---

## License

Proprietary – internal project (update as appropriate).


