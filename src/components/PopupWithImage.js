import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
    constructor(popupSelector, popupElement) {
        super(popupSelector, popupElement);
        this._placeElement = this._popupElement.querySelector('.popup__title')
        this._pictureElement = this._popupElement.querySelector('.popup__picture')

    }
    open(place, link) {
        super.open()
        this._placeElement.textContent = place
        this._pictureElement.src = link
        this._pictureElement.alt = place
    }
}
