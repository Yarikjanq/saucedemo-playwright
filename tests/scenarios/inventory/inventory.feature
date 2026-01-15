Feature: Inventory products

    Background:
        Given User navigate to the Website and login


    Scenario: Product sorting
        When User clicks on the sorting dropdown
        Then User should see the sorting dropdown with the following options:
            | Name (A to Z)       |
            | Name (Z to A)       |
            | Price (low to high) |
            | Price (high to low) |

        When User selects "Price (low to high)" from the sorting dropdown
        Then Products should be sorted by low to high

    Scenario: Reset app state
        When User clicks on the button "Add to cart" of product name "Sauce Labs Bike Light"
        Then User should see that the button changed to "Remove" of product name "Sauce Labs Bike Light"
        And The cart count should be 1

        When User clicks on the burger menu
        And User clicks on "Reset App State" link
        Then User should see that count of cart is empty



