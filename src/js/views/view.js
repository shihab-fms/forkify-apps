// import { turn } from 'core-js/core/array';
import icons from '../../img/icons.svg';

export default class View {
  _data;

  renderMarkup(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();

    this._data = data;
    const markup = this._generateMarkup();

    if(!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  updateMarkup(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDom.querySelectorAll('*'));
    const curElement = Array.from(this._parentEl.querySelectorAll('*'));
    // console.log(newElement)
    newElement.forEach((newEL, i) => {
      const curEl = curElement[i];
      // console.log(curEl, newEL.isEqualNode(curEl))

      if (
        !newEL.isEqualNode(curEl) &&
        newEL.firstChild.nodeValue.trim() !== ''
      ) {
        // console.log(newEL.firstChild.nodeValue.trim());
        curEl.textContent = newEL.textContent;
      }
      if (!newEL.isEqualNode(curEl)) {
        Array.from(newEL.attributes).forEach(attri =>
          curEl.setAttribute(attri.name, attri.value)
        );
      }
    });
  }

  renderSpinner() {
    this._parentEl.innerHTML = '';
    const sppiner = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
    this._parentEl.insertAdjacentHTML('afterbegin', sppiner);
  }

  renderErrorMessage(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }
}
