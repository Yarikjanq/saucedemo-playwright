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

Then(
  "Products should be sorted by low to high",
  async function (this: ICustomWorld) {
    const productList = this.page!.locator('[data-test="inventory-list"]');

    const pricesText = await productList
      ?.locator('[data-test="inventory-item-price"]')
      .allTextContents();

    const prices = pricesText.map((price) => Number(price.replace("$", "")));

    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  }
);

Then(
  "User should see that count of cart is empty",
  async function (this: ICustomWorld) {
    const cartCount = this.page!.locator('[data-test="shopping-cart-badge"]');

    expect(cartCount).toBeHidden();
  }
);
