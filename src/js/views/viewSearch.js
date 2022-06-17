import { mark } from 'regenerator-runtime';
import icons from '../../img/icons.svg';
import View from './view';

class ViewSearchResult extends View {
  _parentEl = document.querySelector('.search');
  _errorMessage = 'No Receipe found! Please try again';
  _message = '';

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._parentEl.querySelector('.search__field').value = '';
    return query;
  }

  addHandelerSearchQuery(handeler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handeler();
    });
  }
}

export default new ViewSearchResult();
