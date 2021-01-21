import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
    constructor({popupSelector, submitFormHandler}) {
        super(popupSelector);
        this._popupElement = document.querySelector(this._popupSelector)
        this._submitFormHandler = submitFormHandler
        this._form = this._popupElement.querySelector('.popup__form')
    }

    close(){
      super.close()
      this._form.reset();
      this._form.removeEventListener('submit', this._submitButtonClick);

    }

    _getInputValues() {
      this._inputList = this._form.querySelectorAll('.popup__input');

      this._formValues = {};
      this._inputList.forEach(input => this._formValues[input.name] = input.value);

      return this._formValues;
    }

    _submitButtonClick = (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._getInputValues());
      this.close();
    }

    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', this._submitButtonClick);
   }
}
