import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import { async } from 'regenerator-runtime';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 0) Updating result view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) loading the recipe
    await model.loadRecipe(id);

    // 3) rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }

  //Test
  //controlServings();
};

const controlSearchResults = async function () {
  try {
    //1. Get search query
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    //2. Load search result
    await model.loadSearchResult(query);

    //3. render results
    resultsView.render(model.getSearchResultsPage());

    //4) Render the initial pagaination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //1. receiving the value from dom fom view
  //  1.a render New results
  //console.log('pag controller', goToPage);
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2) Render New pagaination buttons
  //console.log('Model Page Status', model.state.page);
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings);

  // update the recipe view as well
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1) Add/remove bookmarks
  if (!model.state.recipe.bookmaked) {
    model.addBookmark(model.state.recipe);
    console.log('Inside IF', model.state.recipe.bookmaked);
  } else {
    model.deleteBookmark(model.state.recipe.id);
    console.log('Inside else');
  }

  //2) Update recipe View
  recipeView.update(model.state.recipe);

  //3. Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  //console.log(newRecipe);
  try {
    // Show Loading spinner
    addRecipeView.renderSpinner();
    // Upload the new Recipe data
    await model.uploadRecipe(newRecipe); // await because it is a asycn function. Then rejected promise will get processed
    console.log(model.state.recipe);

    // Render Recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID form history API in Url
    window.history.pushState(null, '', `#${model.state.recipe.id}`); // state, title, url

    // close from window
    setTimeout(function () {
      addRecipeView.toogleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log('Error :', err);
    addRecipeView.renderError(err);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandleRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults); // publsiher effect
  paginationView.addHandlerClick(controlPagination); // paginationView.addHandlerClick object ma handler funtion pathako
  addRecipeView._addHandlerUpload(controlAddRecipe);
};

init();
