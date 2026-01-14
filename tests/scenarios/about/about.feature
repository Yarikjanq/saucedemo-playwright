Feature:About page

    Background:
        Given User navigate to the Website and login

    Scenario: Navigate to about page
        When User clicks on the burger menu
        Then User should see a popup menu with the following items:
            | All Items       |
            | About           |
            | Logout          |
            | Reset App State |

        When User hovers over "About" link
        Then User should see "Green" color of "About" link

        When User clicks on "About" link
        Then User should be redirected to "https://saucelabs.com/"
        And User should see "Build apps users love with AI-driven quality" on the page