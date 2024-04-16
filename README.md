Foodify is a vanilla JavaScript application that interacts with the Forkify API to fetch and display recipe food data. The user can search for a specific recipe, and save it to a favorites list via local storage. The user can easily increase or decrease servings as per his need and can view detailed directions.

Built With
This app is built with pure vanilla JavaScript along with HTML and SCSS. It uses Webpack as a module bundler and NPM as a package manager.

HTML
SCSS
Vanilla JavaScript
Webpack
NPM

Getting Started
To get started with the project just simply fork this repo or download it locally on your System.

To get a local copy up and running follow these simple example steps.

Prerequisites
Start with the latest version of NPM to avoid any errors:

npm
npm install npm@latest -g

Also, install additional dependencies
npm i --save core-js regenerator-runtime
 
Installation
Get a free API Key at Forkify API_KEY
Clone the repo
git clone https://github.com/AsifAhmed96/forkify
Install NPM packages
npm install
Enter your API in config.js
const KEY = 'ENTER YOUR API';

Usage
The Forkify Recipe App allows users to search for recipes.

Users can view the recipe along with the cooking time and also increase or decrease the amount of servings they need.

Bookmarked recipes are stored in local storage so no database was required for this application.

Proposed features
Several pages between the pagination buttons.

Ability to sort search results by duration or number of ingredients.

Ingredient validation in view, before submitting the form.

Improving recipe ingredient input: separate in multiple fields and allow more than 6 ingredients.

Shopping list feature: button on a recipe to add ingredients to a list.

Weekly meal planning feature: assign recipes to the next 7 days and show them on a weekly calendar.

Nutrition data on each ingredient from spoonacular API (https:// spoonacular.com/food-api) and calculate the total calories of the recipe.
