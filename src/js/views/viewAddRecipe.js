import View from './view';

class viewAddRecipe extends View {
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnCloseWindow = document.querySelector('.btn--close-modal');
  _btnOpenWindow = document.querySelector('.nav__btn--add-recipe');

  constructor() {
    super();

    this._addhandlerCloseWindow();
    this._addhandlerOpenWindow();
  }

  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addhandlerOpenWindow() {
    this._btnOpenWindow.addEventListener(
      'click',
      this._toggleWindow.bind(this)
    );
  }

  _addhandlerCloseWindow() {
    this._btnCloseWindow.addEventListener(
      'click',
      this._toggleWindow.bind(this)
    );
  }

  addhandlerUploadRecipe(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      const dataArr = [...new FormData(this._parentEl)];
      // console.log(dataArr);
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new viewAddRecipe();
