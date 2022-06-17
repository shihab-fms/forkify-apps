import View from './view';
import viewPreview from './viewPreview';

class ViewBookmark extends View {
  _parentEl = document.querySelector('.bookmarks');
  _errorMessage = 'No bookmark yet! Chose the best recipe bookmarked it....';
  _message = '';

  addhandlerbookmark(handler){
    window.addEventListener('load', handler)
  }

  _generateMarkup() {
    return this._data.map(bookmark => viewPreview.renderMarkup(bookmark, false)).join('');
  }
}

export default new ViewBookmark()