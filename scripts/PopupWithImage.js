import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._popupElement = document.querySelector(this._popupSelector)
    }
    open(place, link) {    
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popupElement.querySelector('.popup__title').textContent = place
        this._popupElement.querySelector('.popup__picture').src = link
    }
}