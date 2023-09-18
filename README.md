# Job Ads Application Documentation

## Application Overview

Get acquainted with the provided HTML and CSS and create an application for job ads. The visitors can view the Home page and All ads page, they can also register with an email, password, and description of skills, which will allow them to create their job ad, as well as apply if interested (but only if the current user is not the author). Authors can edit or delete ads at any time.

## Functional Requirements

### Guest (not logged in)

Guest navigation example:

- The application should provide Guest (not logged in) users with the functionality to register, login, view the Home Page, All Ads page, and the Details page.

User navigation example:

- The application should provide Users (logged in) with the functionality to:
  - View Home Page and all other pages with logged-in navigation
  - View All ads page
  - Create new ad [Create Ad]
  - Access ad details page [Details]
  - Applying for an ad (if the current user is not the author of the ad)
  - Delete or Edit ad depending on user's authentication (only for the author of the current ad)

## Database Models

The Database of the Job Ads application needs to support 2 entities. Note: You can add additional properties to the models if this will help you solve the task.

### User

- Email - string (required)
- Password - string (required)
- Description of skills - string (required)
- My ads - a collection of Ads (a reference to the Ad Model)

Note: When a user creates a new ad, a reference to that ad is added to that collection (My ads).
