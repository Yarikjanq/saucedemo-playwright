import {
  BeforeAll,
  AfterAll,
  Before,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext } from "@playwright/test";
import { ICustomWorld } from "./custom-world.js";
import { config } from "./config";

let browser: Browser;
let context: BrowserContext;

setDefaultTimeout(30_000);

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true, slowMo: 1000 });
  context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
});

Before(async function (this: ICustomWorld) {
  this.baseUrl = config.BASE_URL;
  this.user = {
    username: config.USERNAME,
    password: config.PASSWORD,
  };
  this.context = context;
  this.page = await context.newPage();
});

AfterAll(async function () {
  await context?.close();
  await browser?.close();
});
