import {
  BeforeAll,
  AfterAll,
  Before,
  setDefaultTimeout,
  After,
} from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext } from "@playwright/test";
import { ICustomWorld } from "./custom-world.js";
import { config } from "./config";

let browser: Browser;

setDefaultTimeout(30_000);

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true, slowMo: 1000 });
});

Before(async function (this: ICustomWorld) {
  this.context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  this.page = await this.context.newPage();

  this.baseUrl = config.BASE_URL;
  this.user = {
    username: config.USERNAME,
    password: config.PASSWORD,
  };
});

After(async function (this: ICustomWorld) {
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser?.close();
});
