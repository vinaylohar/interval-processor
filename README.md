# Interval Processor API

Clean Node.js + TypeScript REST API to process include/exclude numeric intervals. ESM project with Swagger UI, integration tests, and CI/CD pipelines.

## Tech stack
- Node.js (ESM, "type": "module")
- TypeScript
- Express, CORS
- Swagger UI (OpenAPI spec in `src/docs/openapi.ts`)
- tsx (dev/test runner)
- GitHub Actions CI/CD

## Project structure
- `src/index.ts` – app entry
- `src/server.ts` – express app + Swagger UI
- `src/routes/interval-routes.ts` – API routes
- `src/services/interval-service.ts` – orchestration
- `src/utils/interval-processor.ts` – merge/subtract/process intervals
- `src/utils/interval-parser.ts` – parse "a-b" strings
- `src/utils/validator.ts` – input validation
- `src/docs/openapi.ts` – OpenAPI spec
- `dist/` – build output (ignored by Git)
- `tests/integration.test.ts` – integration tests
- `.github/workflows/*.yml` – CI/CD pipelines

## APIs
The following APIs are available:
1. **POST /intervals**  
   Processes intervals based on include/exclude logic. Accepts an object with `includes` and `excludes` arrays.
2. **GET /health**  
   Returns the health status of the service, including a timestamp, service name, and version.

Swagger UI is available for testing these APIs at:  
`http://localhost:3000/api-docs`

## Requirements
- Node.js 20/22 (recommended 20+)
- npm

Note: ESM requires explicit `.js` extensions in relative imports inside `.ts` files.

## Install
```bash
npm ci
```

## Run (development)
Run the project in development mode with hot-reload:
```bash
npm run dev
```

## Build and run (production)
Build the project and run it in production mode:
```bash
npm run build
node dist/index.js
```

## Run tests
To run the integration tests:
```bash
npm test
```

## CI/CD
The GitHub Actions CI/CD pipeline is configured to automatically run the tests on every push or pull request. This ensures that the codebase remains stable.

## Debug mode in VS Code
To enable debug mode in Visual Studio Code:
1. Update the npm path in the VS Code settings to point to the correct Node.js version.
2. Use the `launch.json` configuration to attach the debugger.

## Environment variables
- `PORT`: Server port (default: 3000)
- `ALLOWED_ORIGINS`: CSV of allowed origins for CORS (default: `http://localhost:3000`)