import { Given, Then, When } from "@cucumber/cucumber";
import { ICustomWorld } from "../custom-world";
import { expect } from "@playwright/test";

Given(
  "User navigate to the Website and login",
  async function (this: ICustomWorld) {
    await this.page?.goto(`${this.baseUrl}`);
    await this.page?.waitForSelector('[data-test="username"]');
    await this.page?.fill('[data-test="username"]', this.user.username);
    await this.page?.fill('[data-test="password"]', this.user.password);
    await this.page?.click('input[type="submit"]');

    const inventoryList = this.page!.locator(".inventory_list");
    await expect(inventoryList).toBeVisible();
  }
);

When("User clicks on the burger menu", async function (this: ICustomWorld) {
  await this.page!.locator('[id="react-burger-menu-btn"]').click();
});

When(
  "User clicks on {string} link",
  async function (this: ICustomWorld, linkName: string) {
    await this.page!.locator("a.menu-item", { hasText: linkName }).click();
  }
);

Then(
  "User should be redirected to {string}",
  async function (this: ICustomWorld, urlName: string) {
    await this.page!.goto(urlName);
  }
);
