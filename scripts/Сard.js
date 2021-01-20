export default class Card {
  constructor ({data, handleCardClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.picture-card').cloneNode(true)
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    const picture = this._element.querySelector('.picture-card__picture');
    picture.src = this._link;
    picture.alt = this._name;
    this._element.querySelector('.picture-card__title').textContent = this._name;
    this._setEventListeners();
    return this._element
  }

  /*_handleOpenImagePopup() {

    const popupImage = document.querySelector('.popup_show-image')
    popupImage.classList.add('popup_opened');

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
        clearTagsImgPopup();
      }
    });

    const popupTitle = popupImage.querySelector('.popup__title');
    popupTitle.textContent = this._name

    const popupImg = popupImage.querySelector('.popup__picture');
    popupImg.src = this._link;
    popupImg.alt = this._name
  }
*/
  _removeCard() {
    if (this._element) {
      this._element.remove();
      this._element = null
    }
  }
  _toggleLike() {
    this._element.querySelector('.picture-card__like').classList.toggle('picture-card__like_active');
  }
  _setEventListeners() {
    this._handleCardClick();
    this._element.querySelector('.picture-card__delButton').addEventListener('click', () =>{
      this._removeCard();
    })
    this._element.querySelector('.picture-card__like').addEventListener('click', () =>{
      this._toggleLike();
    })
  }
}
