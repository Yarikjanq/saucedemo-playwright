Feature: Shopping cart

    Background:
        Given User navigate to the Website and login

    Scenario: View product in cart
        When User clicks on the button "Add to cart" of product name "Sauce Labs Bike Light"
        Then User should see that the button changed to "Remove" of product name "Sauce Labs Bike Light"
        And The cart count should be 1

        When User click on the shopping cart icon
        Then User should be on the "https://www.saucedemo.com/cart.html"
        And User should see only "Sauce Labs Bike Light" product in the cart

    Scenario: Remove product from cart
        When User clicks on the button "Add to cart" of product name "Sauce Labs Bike Light"
        Then User should see that the button changed to "Remove" of product name "Sauce Labs Bike Light"
        And The cart count should be 2

        When User click on the shopping cart icon
        And User clicks on the "Remove" button
        Then Product "Sauce Labs Bike Light" should not be visible in the cart

        When User clicks the "Continue Shopping" button
        Then User should be on the "https://www.saucedemo.com/inventory.html"

    Scenario: Check cart with multiple products
        When User adds all products to the cart
        Then Cart should display the total number of added products

        When User click on the shopping cart icon
        Then User should be on the "https://www.saucedemo.com/cart.html"
        And User should see the selected quantity of products
