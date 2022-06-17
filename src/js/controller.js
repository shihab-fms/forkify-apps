import * as model from './model.js';
import viewRecipe from './views/viewRecipe.js';
import viewSearch from './views/viewSearch.js';
import viewResult from './views/viewResult.js';
import viewPagination from './views/viewPagination.js';
import viewBookmark from './views/viewBookmark.js';
import viewAddRecipe from './views/viewAddRecipe.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
// import viewPagination from './views/viewPagination.js';

// Showing final recipe in the UI
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; // guard class for if there is no id

    // 1) loading spinner
    viewRecipe.renderSpinner();
    // bookmarked
    // 0) update search result to mark search result
    viewResult.updateMarkup(model.loadPagination());

    // 4) bookmarks updateing
    // debugger;
    viewBookmark.updateMarkup(model.state.bookmarks);

    // 2) loading recipe
    await model.loadRecipe(id);

    // 3) rendering recipe
    viewRecipe.renderMarkup(model.state.recipe);
  } catch (err) {
    viewRecipe.renderErrorMessage();

    // temp error
    console.log(`${err.message} ⚠️⚠️⚠️`);
  }
};

const controlSearchResult = async function () {
  try {
    viewResult.renderSpinner();

    // 1) get query string what have to search
    const query = viewSearch.getQuery();
    if (!query) return;

    // 2) loadig search result
    await model.loadSearchResult(query);

    // loading sppiner;

    // 3) rendering result that you search

    viewResult.renderMarkup(model.loadPagination());
    // viewResult.updateMarkup(model.loadPagination());
    // viewPagination.renderMarkup()

    // 4) rendering pagination inisializing
    viewPagination.renderMarkup(model.state.search);
  } catch (err) {
    console.log(err);

    viewResult.renderErrorMessage();
  }
};

const controlPagination = function (goToPage) {
  // const curPage = +btn.dataset.goto;
  // const goToPage = btn.classList.contains('pagination__btn--prev')
  //   ? curPage - 1
  //   : curPage + 1;

  viewResult.renderMarkup(model.loadPagination(goToPage));
  viewPagination.renderMarkup(model.state.search);
  // console.log(btn, goToPage);
};

const controlServings = function (updateTo) {
  // model.updateServings(updateTo);
  model.updateServings(updateTo);

  viewRecipe.updateMarkup(model.state.recipe);
};

const controladdBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  viewRecipe.renderMarkup(model.state.recipe);

  viewBookmark.renderMarkup(model.state.bookmarks);

  // console.log(model.state.recipe);
};

const controlBookmarks = function () {
  viewBookmark.renderMarkup(model.state.bookmarks);
};

const controlUploadRecipe = async function (newRecipe) {
  try {
    //upload new recipe
    await model.uploadRecipe(newRecipe);

    // viewAddRecipe.renderMarkup(model.state.recipe)
  } catch (err) {
    console.log(err.message, 'me')
    viewAddRecipe.renderErrorMessage(err)
  }
};

// const goBack = function(){
//   window.history.back();
// }

const newFeature = function(){
  console.log('welcome to the application!')
}

const ints = function () {

  /**
   * @author Mohammad shiful islam / shiahb
   */
  viewAddRecipe.addhandlerUploadRecipe(controlUploadRecipe);
  viewBookmark.addhandlerbookmark(controlBookmarks);
  viewRecipe.addHandelerRender(controlRecipe);
  viewRecipe.addHanlerUpdateServings(controlServings);
  viewRecipe.addHandlerAddBookmark(controladdBookmark);
  viewSearch.addHandelerSearchQuery(controlSearchResult);
  viewPagination.addhendlerClick(controlPagination);
  // goBack();
  newFeature();
};

ints();
