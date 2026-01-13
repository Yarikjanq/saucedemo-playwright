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
        Then Products should be sorted by "Price (low to high)"



