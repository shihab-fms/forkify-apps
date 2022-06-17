import View from './view';
import viewPreview from './viewPreview';

class ViewResult extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'we could not find that result, please try another one';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(result => viewPreview.renderMarkup(result, false))
      .join('');
  }
}

/** 
 document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
 */

export default new ViewResult();
