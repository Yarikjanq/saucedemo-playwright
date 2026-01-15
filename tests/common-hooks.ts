import {
  BeforeAll,
  AfterAll,
  Before,
  setDefaultTimeout,
  After,
  ITestCaseHookParameter,
  Status,
} from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext } from "@playwright/test";
import { ICustomWorld } from "./custom-world.js";
import { config } from "./config";

let browser: Browser;
const tracesDir = "traces";

setDefaultTimeout(30_000);

BeforeAll(async function () {
  browser = await chromium.launch({
    // headless: false,
    // slowMo: 1000,
  });
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  this.testName = pickle.name;
  this.startTime = new Date();

  this.context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  await this.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
  });

  this.page = await this.context.newPage();

  this.baseUrl = config.BASE_URL;
  this.user = {
    username: config.USERNAME,
    password: config.PASSWORD,
  };
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    this.attach(
      `Status: ${result.status}. Duration: ${result.duration?.seconds}s`,
      "text/plain"
    );

    if (result.status !== Status.PASSED && this.context) {
      const timePart = this.startTime
        ?.toISOString()
        .split(".")[0]
        .replaceAll(":", "_");

      const safeTestName = this.testName.replace(/\s+/g, "_");

      try {
        await this.context.tracing.stop({
          path: `${tracesDir}/${safeTestName}-${timePart}-trace.zip`,
        });
      } catch (e) {
        console.warn("Trace was not saved:", e);
      }
    }
  }

  await this.page?.close().catch(() => {});
  await this.context?.close().catch(() => {});
});

AfterAll(async function () {
  await browser?.close();
});
