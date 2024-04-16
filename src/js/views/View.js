import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;

  /**
   * render the recieved object to DOM
   * @param {object | Object []} data the data to be render (e.g recipe)
   * @param {boolean} [render = tue] If false, create markup string insted of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {object} View instance
   * @author Sajal Timilsina
   * @todo Finish the implementation
   */

  render(data, render = true) {
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    console.log('new features');
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    console.log('Update is Called');
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup); // virtual memory DOM
    const newElements = newDOM.querySelectorAll('*');
    //console.log(newElements);
    const curElements = this._parentElement.querySelectorAll('*');
    //console.log(curElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //console.log(curEl, newEl.isEqualNode(curEl));

      // Update Changed TEXt
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // chaining to check firstnode exist
        curEl.textContent = newEl.textContent;
      }

      // Updates Chnaged Attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    //  protected method
    this._parentElement.innerHTML = '';
  }

  renderSpinner = function () {
    const markUp = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  };

  renderMessage(message = this._message) {
    const markUp = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderError = function (message = this._errorMessage) {
    const markUp = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  };
} // we make default bcz we are not going to create instant of the view. It will be parent of other views
