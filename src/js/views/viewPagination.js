import View from './view';
import icons from '../../img/icons.svg';
import * as model from '../model.js';

class Pagination extends View {
  _parentEl = document.querySelector('.pagination');
  _errorMessage = 'we could not find that result, please try another one';
  _message = '';

  _generateMarkup() {
    const numPage = Math.ceil(
      this._data.recipes.length / this._data.resultPerPage
    );
    const currentPage = this._data.page;

    if (currentPage === 1 && numPage > 1) {
      return this.#generateLeftSideButton(currentPage);
    }
    if (currentPage < numPage) {
      return `${this.#generateRtghtSideButton(
        currentPage
      )}${this.#generateLeftSideButton(currentPage)}`;
    }
    if (currentPage === numPage) {
      return this.#generateRtghtSideButton(currentPage);
    }

    return '';
  }

  addhendlerClick(handeler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handeler(goToPage);
    });
  }

  #generateRtghtSideButton(curPage) {
    return `
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>page ${curPage - 1}</span>
          </button>
          `;
  }
  #generateLeftSideButton(curPage) {
    return `
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;
  }
}

export default new Pagination();
