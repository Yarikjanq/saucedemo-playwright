import { When, Then, DataTable } from "@cucumber/cucumber";

import { expect } from "@playwright/test";

import { ICustomWorld } from "../custom-world.js";

const colorMapping: { [key: string]: string } = {
  Green: "rgb(61, 220, 145)",
};

Then(
  "User should see a popup menu with the following items:",
  async function (this: ICustomWorld, dataTable: DataTable) {
    await this.page!.waitForTimeout(500);
    const expectedColumns = dataTable.raw().flat();

    const headerLocators = this.page!.locator(".bm-menu-wrap .menu-item");

    await expect(headerLocators).toHaveText(expectedColumns);
  }
);

When(
  "User hovers over {string} link",
  async function (this: ICustomWorld, itemName: string) {
    await this.page!.locator("a.menu-item", { hasText: itemName }).hover();
  }
);

Then(
  "User should see {string} color of {string} link",
  async function (this: ICustomWorld, color: string, linkName: string) {
    const expectedColor = colorMapping[color];
    if (!expectedColor) {
      throw new Error(`Color "${color}" not found in color mapping.`);
    }

    const itemLocator = this.page!.locator("a.menu-item", {
      hasText: linkName,
    });
    const actualColor = await itemLocator.evaluate((element) => {
      return window.getComputedStyle(element).color;
    });

    expect(actualColor).toBe(expectedColor);
  }
);

Then(
  "User should see {string} on the page",
  async function (this: ICustomWorld, expectedText: string) {
    const someElement = this.page!.locator("h1", { hasText: expectedText });
    await expect(someElement).toBeVisible();
  }
);
