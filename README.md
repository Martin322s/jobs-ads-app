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

### Ad

- Headline - string (required)
- Location - string (required)
- Company name - string (required)
- Company description - string (required)
- Author - object Id (a reference to the User model)
- Users applied - a collection of Users (a reference to the User model)

Note: When a user applies for an ad, their id is added to this collection (Users applied).

## Application Pages

### Home Page (for logged in users and logged-out users)

Show the first three added job ads. Each ad must show information about the headline, and the total number of candidates.

If there are still no job ads, display "No ads created!"

### Register Page (logged out user)

Register a user inside the database with email, password, and description of skills. Password inside the database must be hashed (use bcrypt) and both passwords must match! After successful registration, redirect to the Home page as an already logged-in user.

### Login Page (logged out user)

### All ads (for logged in users and logged out users)

List of all job ads. Each ad should display information about the headline, the company name, the location, as well as the [Details] button that leads to the details page for the specific ad.

If there are no job ads in the database, display the following view:

### Details Page - (for logged in users)

All users should be able to view details about the ad. Clicking the Details button on the ad card should display the Details page. If the currently logged-in user is the author of the ad, the Edit and Delete buttons should be displayed, otherwise they should not be available.

Information about the ad:

- Author
- Headline
- Company name
- Company description
- Location
- Buttons (Depending on the status of the currently logged in user)

Logging an already registered user with the correct email and password. After successful login, redirect to the Home page as an already logged-in user.

### Logout (logged in user)

The logout action is available to logged-in users. Upon success, clear any session information and redirect the user to the Home page.

### All ads (for logged in users and logged out users)

List of all job ads. Each ad should display information about the headline, the company name, the location, as well as the [Details] button that leads to the details page for the specific ad.

If there are no job ads in the database, display the following view:

### Details Page - (for logged in users)

All users should be able to view details about the ad. Clicking the Details button on the ad card should display the Details page. If the currently logged-in user is the author of the ad, the Edit and Delete buttons should be displayed, otherwise they should not be available.

Information about the ad:

- Author
- Headline
- Company name
- Company description
- Location
- Buttons (Depending on the status of the currently logged in user)

### Details Page (logged out users)

If the user has not logged in, no buttons should be displayed.

### Details Page (logged in user and author of the current ad)

If the currently logged-in user is the author (the user who created the job ad), he should see the [Edit] and [Delete] buttons. Also, only the author has the right to see the information about all candidates (those who have applied for a current ad). For each candidate, show their email and description of their skills. If there is no candidats, you don't need to visualize anything further.

### Details Page (logged in user who did not apply for a current ad)

If the currently logged-in user is not the author (the user that is not the creator) and has not applied for this ad, he should see the [Apply now!] button and paragraph [Hurry up, {total number of candidates} people have already applied.].

### Details Page (logged in and has already applied for a current ad)

If the currently logged-in user is not the author and has already applied for a current ad, he should see the paragraph [You have already applied!].

### Apply for a job ad (logged in user who is not the author of the ad)

Any registered user who is not the author of the job ad must be able to apply (if they have not already applied).

If the user applies successfully, the userId of the user must be added to the collection of Users applied. Then redirect the user to the Details page for the current job ad.

If a user has applied for a current job ad, he should see the paragraph "You have already applied!".

If the user has successfully applied, do not forget to update the value total number of candidates (inside the span tag) on the Home page (as you will need to visualize the three first added ads).

### Create Ad Page (logged in user)

The Create page is available to logged-in users. It contains a form for adding a new job ad. Upon success, redirect the user to the All ads page.

### Delete Ad (logged in user and author of the current ad)

Every author should be able to click over the [Delete] button - deleting the current ad from the database and the user should be redirected to the All ads page.

### Edit Ad (logged in user and author of the current ad)

The Edit page is available to logged-in users and it allows authors to edit their ads. Clicking the [Edit] button of a particular ad on the Details page should display the Edit page, with all fields filled with the data for the ad. It contains a form with input fields for all relevant properties. Upon success, redirect the user to the Details page for the current ad.

## Security Requirements (Routes Guards)

The Security Requirements are mainly access requirements. Configurations about which users can access specific functionalities and pages.

- Guest (not logged in) users can access the Home Page.
- Guest (not logged in) users can access the Login page and functionality.
- Guest (not logged in) users can access the Register page and functionality.
- Guest (not logged in) and Users (logged in) can access the All ads page.
- Guest (not logged in) can access the Details page without functionality.
- Users (logged in) can access Home Page.
- Users (logged in) can access the Details page and functionality.
- Users (logged in) can access Create Ad page and functionality.
- Users (logged in and not authors of the current ad) can access Apply for ad functionality.
- Users (logged in and author of the current ad can access the Delete and Edit ad functionality.
- Users (logged in) can access Logout functionality.

If Guests (not logged in) try to access a page they should not be able to, you must redirect them to the Login page.

If Users (logged in) try to access a page they should not be able to, you must redirect them to the Home Page.

# Validation and Error Handling

The application should notify the users about the result of their actions. In case of error, you should display div with class "error-box". You can choose to display the first error or all of them. You have complete freedom to choose the content of the error message you will display.

### Login / Register

You should make the following validations:

- The email should be in the following format: `<name>@<domain>.<extension>`
  - Only English letters are allowed for any of the parts of the email
  - There must be a @ after the <name>
  - There must be a point(.) after the <domain>
  - Example of a valid email - "petar@softuni.bg"
- The password should be at least 5 characters long
- The repeat password should be equal to the password
- The description of skills should be a maximum of 40 characters long
