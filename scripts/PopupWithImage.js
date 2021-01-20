import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
    }
    open() {
        console.log(this._popupSelector)
        document.querySelector(this._popupSelector).classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
}