# TrackYourCatchCO

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.11.

## Features

1. User Registration/Login/Authentication (via Okta) - integrated okta authentication for user registration and signin.  Utilized the okta signin widget to make it so user doesn't need to leave app.
2. Adding Fishing Trips​ - CRUD, user can add/view/update/delete trips
3. Adding Catches to Trips​ - CRUD, user can add/view/update/delete catches from a trip
4. Geolocation of a catch​ - the user can use the geolocation api to get the latitude and longitude of a catch
5. Displaying a map with a pin for the geolocated catch - once a catch has a latitude and longitude, a google map api is used to show the catch on a map

## Node and NPM Versions

- Node: v14.16.1
- NPM: v6.14.13

## Installation

Run `npm i` to install all of the dependencies inside of the TrackYourCatchCO project

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Statement of Originality

I certify that, to the best of my knowledge, the content of this project is of my own work with the exception of areas of code that have been attributed to others in the comments of those relevant files.

- Benjamin Neil Bruffey

## Project Description

This nano site is a site provided to anglers to keep track of their catches and where they caught them.
It provides a way to create an account, login, and add catches as well as search the catches of others.

## Version History

- v.1
  - Base site functionality added, login feature, adding, editing, deleting trips.
  - Creating Accounts, updating accounts (handled on the Okta side)

- v.2
  - Added catch functionality (CRUD)
  - Added geolocation for catch functionality using HTML5 geolocation
  - Added loading mask while geolocation is occuring

- v.3
  - Added ability to add lat/long manually on catches
  - Added unit tests
  - Added login e2e test (with test user account)
  - Updated API service to account for the manual lat/long entry

- v.4
  - updated tests
  - ran ng lint and fixed all issues
  - tweaked instances were subscribes were used to verify the completed
  - fixed bugs involving dates (was showing a day behind in the UI)
  - fixed hide/show text of the map button

## Contact information

- Name: Benjamin Bruffey
- Email: bbruffey@regis.edu

## Areas to improve

## Known Issues

- Need to update and add more unit tests
