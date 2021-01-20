export default class Popup{
    constructor(popupSelector){
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector)
    }
    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose); 
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
            //clearTagsImgPopup();
        }
    }
    setEventListeners() {
        this._popupElement.querySelector('.popup__close-button').addEventListener('click', () => {
            console.log(this._popupElement.querySelector('.popup__close-button'))
            this.close();
        });
    }
} 