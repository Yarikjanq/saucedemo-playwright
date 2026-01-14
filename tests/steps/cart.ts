import { Given, When, Then } from "@cucumber/cucumber";

import { expect } from "@playwright/test";

import { ICustomWorld } from "../custom-world.js";

let selectedProducts: number | null;

When(
  "User clicks the {string} button",
  async function (this: ICustomWorld, buttonName: string) {
    await this.page?.getByRole("button", { name: buttonName }).click();
  }
);

Then(
  "User should be on the {string}",
  async function (this: ICustomWorld, expectedUrl: string) {
    await expect(this.page!).toHaveURL(expectedUrl);
  }
);

When(
  "User clicks on the button {string} of product name {string}",
  async function (this: ICustomWorld, addCart: string, productName: string) {
    const productLocator = this.page!.locator('[data-test="inventory-item"]', {
      hasText: productName,
    });

    await productLocator
      .getByRole("button", {
        name: addCart,
      })
      .click();
  }
);

Then(
  "User should see that the button changed to {string} of product name {string}",
  async function (
    this: ICustomWorld,
    changedText: string,
    productName: string
  ) {
    const button = this.page!.locator('[data-test="inventory-item"]', {
      hasText: productName,
    }).getByRole("button", { name: changedText, exact: true });

    await expect(button).toBeVisible();
  }
);

Then(
  "The cart count should be {int}",
  async function (this: ICustomWorld, expectedCount: number) {
    const cartBadge = this.page!.locator('[data-test="shopping-cart-badge"]');

    await expect(cartBadge).toHaveText(String(expectedCount));
  }
);

When(
  "User click on the shopping cart icon",
  async function (this: ICustomWorld) {
    await this.page!.locator('[id="shopping_cart_container"]').click();
  }
);

Then(
  "User should see only {string} product in the cart",
  async function (this: ICustomWorld, productName: string) {
    const productLocator = this.page!.locator(
      '[data-test="inventory-item-name"]',
      {
        hasText: productName,
      }
    );

    await expect(productLocator).toHaveCount(1);
  }
);

When(
  "User clicks on the {string} button",
  async function (this: ICustomWorld, buttonName) {
    await this.page!.locator('[id="remove-sauce-labs-bike-light"]', {
      hasText: buttonName,
    }).click();
  }
);

Then(
  "Product {string} should not be visible in the cart",
  async function (this: ICustomWorld, productName) {
    const productLocator = this.page!.locator(
      '[data-test="inventory-item-name"]',
      {
        hasText: productName,
      }
    );

    await expect(productLocator).toBeHidden();
  }
);

When("User adds all products to the cart", async function (this: ICustomWorld) {
  const buttons = this.page!.locator('[id^="add-to-cart-"]');
  let count = await buttons.count();

  for (let i = 0; i < count; i++) {
    await buttons.first().click();
  }
});

Then(
  "Cart should display the total number of added products",
  async function (this: ICustomWorld) {
    const blocks = await this.page!.locator(
      '[data-test="inventory-item"]'
    ).count();

    const cartCount = await this.page!.locator(
      '[data-test="shopping-cart-badge"]'
    ).textContent();

    selectedProducts = Number(cartCount);

    expect(blocks).toBe(Number(cartCount));
  }
);

Then(
  "User should see the selected quantity of products",
  async function (this: ICustomWorld) {
    const productLocator = await this.page!.locator(
      '[data-test="inventory-item-name"]'
    ).count();

    expect(productLocator).toBe(selectedProducts);
  }
);
