# NutriPlan Lite

NutriPlan Lite is a lightweight Node.js/Express web application created for SIT707 Task 7.2HD. It is intentionally designed for CI/CD demonstration using GitHub, Google Cloud Build, Docker, and Google Cloud Run.

## Features

- Simple meal plan generator
- REST API endpoint for automated tests
- Jest and Supertest test suite
- Dockerfile for container deployment
- Cloud Build configuration for CI/CD

## Run Locally

```bash
npm install
npm test
npm start
```

Open:

```text
http://localhost:8080
```

Health endpoint:

```text
http://localhost:8080/health
```

## CI/CD Flow

1. Push code to GitHub.
2. Google Cloud Build trigger starts automatically.
3. Pipeline runs `npm ci`.
4. Pipeline runs `npm test`.
5. Docker image is built and pushed.
6. Application is deployed to Cloud Run.

## Intentional Failing Test for Evidence

To demonstrate failure evidence, temporarily change this line in `tests/mealService.test.js`:

```js
expect(getCalorieCategory(2100)).toBe('balanced');
```

to:

```js
expect(getCalorieCategory(2100)).toBe('light');
```

Push the change. Cloud Build should fail. Then fix it back and push again to demonstrate successful CI/CD.
