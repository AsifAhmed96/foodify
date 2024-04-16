import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');

_window = document.querySelector('.add-recipe-window');

_overlay = document.querySelector('.overlay');
_btnOpen = document.querySelector('.nav__btn--add-recipe');
_btnClose = document.querySelector('.btn--close-modal');
_message = "Recipe was successfully uploaded";

constructor(){
    super();
    this._addHadlerShowWinodw();
    this._addHandlerHideWindow();
}
toogleWindow(){
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
}
_addHadlerShowWinodw(){
    this._btnOpen.addEventListener('click', this.toogleWindow.bind(this)); // farak farak this banako
}

_addHandlerHideWindow(){
    this._btnClose.addEventListener('click', this.toogleWindow.bind(this)); // farak farak this banako
    this._overlay.addEventListener('click', this.toogleWindow.bind(this)); // farak farak this banako
}


_addHandlerUpload(handler){
    this._parentElement.addEventListener('submit', function(e){
        e.preventDefault();
        const dataArr = [...new FormData(this)]; // will return object but we can spread that object into array
        const data = Object.fromEntries(dataArr); // this takes an array of entries and convert to object
        handler(data);
    } )
}

  _generateMarkup() {
    
    
  
  }
}

export default new addRecipeView();
