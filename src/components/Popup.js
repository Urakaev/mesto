export default class Popup{
    constructor(popupSelector){
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOutsideClose = this._handleOutsideClose.bind(this);
        this._handleCLosePopupButton =  this._handleCLosePopupButton.bind(this);
    }
    open() {
        this._popupElement.classList.add('popup_opened');
        this.setEventListeners()
    }
    close() {
        this._popupElement.classList.remove('popup_opened');

        this._popupElement.querySelector('.popup__close-button').removeEventListener('click', this._handleCLosePopupButton);
        this._popupElement.removeEventListener('click', this._handleOutsideClose);
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
          this.close()
        }
    }
    _handleOutsideClose(evt) {
      if (evt.target.classList.contains('popup')) {
        this.close()
      }
    }
    _handleCLosePopupButton()  {
      this.close()
    }
    setEventListeners() {
        this._popupElement.querySelector('.popup__close-button').addEventListener('click', this._handleCLosePopupButton);
        this._popupElement.addEventListener('click', this._handleOutsideClose);
        document.addEventListener('keydown', this._handleEscClose);
    }

}
