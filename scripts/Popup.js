export default class Popup{
    constructor(popupSelector){
        this._popupSelector = popupSelector;
    }
    open() {
        //console.log(this._popupSelector)
        //this._popupSelector.classList.add('.popup_opened');
        //document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popupSelector.remove.add('.popup_opened');
        document.removeEventListener('keydown', this._handleEscClose); 
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            closePopup(document.querySelector('.popup_opened'));
            clearTagsImgPopup();
        }
    }
    setEventListeners() {
        this_.popupSelector.querySelector('.popup__close-button').addEventListener('click', () => {
            this.close();
        });
    }
} 