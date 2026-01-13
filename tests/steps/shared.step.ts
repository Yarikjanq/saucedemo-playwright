import { Given } from "@cucumber/cucumber";
import { ICustomWorld } from "../custom-world";
import { expect } from "@playwright/test";

Given(
  "User navigate to the Website and login",
  async function (this: ICustomWorld) {
    await this.page?.goto(`${this.baseUrl}`, { timeout: 90000 });
    await this.page?.waitForSelector('[data-test="username"]', {
      timeout: 120000,
    });
    await this.page?.fill('[data-test="username"]', this.user.username);
    await this.page?.fill('[data-test="password"]', this.user.password);
    await this.page?.click('input[type="submit"]');

    const inventoryList = this.page!.locator(".inventory_list");
    await expect(inventoryList).toBeVisible();
  }
);
