import { When, Then, DataTable } from "@cucumber/cucumber";

import { expect } from "@playwright/test";

import { ICustomWorld } from "../custom-world.js";

When(
  "User clicks on the sorting dropdown",
  async function (this: ICustomWorld) {
    await this.page!.locator('[data-test="product-sort-container"]').click();
  }
);

Then(
  "User should see the sorting dropdown with the following options:",
  async function (this: ICustomWorld, dataTable: DataTable) {
    const expectedColumns = dataTable.raw().flat();

    const headerLocators = this.page!.locator(
      '[data-test="product-sort-container"] option'
    );

    await expect(headerLocators).toHaveText(expectedColumns);
  }
);

When(
  "User selects {string} from the sorting dropdown",
  async function (this: ICustomWorld, value: string) {
    await this.page!.selectOption('[data-test="product-sort-container"]', {
      label: value,
    });
  }
);
