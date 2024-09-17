# MovieApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.13.

# MovieListApp

This is a movie listing application that allows users to browse movies, filter by genres, and view movie details. 
The project implements infinite scrolling and is designed to be mobile-friendly, following a Figma prototype.

## Live Demo
[Live Project Link](#)  <!-- Replace with your live project URL -->

## Features Covered
- Browse movies and view detailed information (e.g., title, genre, and description).
- Filter movies by genre using data from the TMDB API.
- Infinite scrolling: load more movies as the user scrolls up or down to load different years.
- Responsive design: the layout adapts to different screen sizes, particularly mobile.

## Features Not Covered
- Cast Director details as it was not available in TMDB API

## How to Run the Project - 

### Prerequisites
- Node.js (v14 or later)
- Angular CLI

### Steps to Set Up
1. Clone the repository:
   
   git clone https://github.com/dikshamaske110/MovieListApp.git
   cd MovieListApp

 2. Install the dependencies:
      npm install

3.Set up your TMDB API key in the environment file (src/environments/environment.ts):
  typescript
  export const environment = {
  production: false,
  apiUrl: 'https://api.themoviedb.org/3',
   apiKey: '7c8fc23a413953340f145f7e39707775';
};

4.Start the development server:
  ng serve

5.Open the app in your browser:
 http://localhost:4200

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
