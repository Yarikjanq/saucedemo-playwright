# saucedemo-playwright

## Description

This project demonstrates UI test automation for saucedemo.com using Playwright, Cucumber, and TypeScript. Tests are organized in BDD style (Gherkin) and integrated with reporting and CI/CD.

---

## How to Run Tests

1. Install dependencies:
```bash
npm install
```

2. Run all tests:
```bash
npm run test
```

---

## Run Specific Scenario by Tag

To run a specific scenario or feature by tag, use:
```bash
npm run single
```
By default, this runs scenarios tagged with `@single`. You can change the tag in the script or add more scripts for other tags as needed.

---

## Test Reports

### Cucumber JSON/HTML Report

After running tests, a JSON report is generated at `reports/cucumber-report.json` (if the formatter is configured in cucumber-js).

To generate an HTML report:
```bash
npm run report
```

The HTML report will be available at `reports/cucumber-report.html`.

### Playwright HTML Report

Playwright report is only generated if you run tests directly with Playwright. In this project, tests are run via Cucumber, so Playwright report is not created automatically.

---

## Project Structure

- `tests/scenarios/` — Gherkin feature files
- `tests/steps/` — step definitions
- `tests/common-hooks.ts` — Playwright+Cucumber hooks
- `playwright.config.ts` — Playwright configuration
- `reports/` — JSON/HTML reports

---

## CI/CD

The project includes a sample workflow for GitHub Actions in `.github/workflows/playwright.yml`.

---

## Useful Commands

- Run all tests: `npm run test`
- Run tests with @single tag: `npm run single`
- Generate Cucumber HTML report: `npm run report`

---

