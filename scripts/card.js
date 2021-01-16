export default class Card {
  constructor (data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.picture-card').cloneNode(true)
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.picture-card__picture').src = this._link;
    this._element.querySelector('.picture-card__picture').alt = this._name;
    this._element.querySelector('.picture-card__title').textContent = this._name;
    this._setEventListeners();
    return this._element
  }

  _handleOpenImagePopup() {
    popupImage.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscPress);

    const popupTitle = popupImage.querySelector('.popup__title');
    popupTitle.textContent = this._name

    const popupImg = popupImage.querySelector('.popup__picture');
    popupImg.src = this._link;
    popupImg.alt = this._name
  }

  _removeCard() {
    if (this._element) {
      this._element.remove();
    }
  }
  _toggleLike() {
    this._element.querySelector('.picture-card__like').classList.toggle('picture-card__like_active');
  }
  _setEventListeners() {
    this._element.querySelector('.picture-card__picture').addEventListener('click', () =>{
      this._handleOpenImagePopup();
    })
    this._element.querySelector('.picture-card__delButton').addEventListener('click', () =>{
      this._removeCard();
    })
    this._element.querySelector('.picture-card__like').addEventListener('click', () =>{
      this._toggleLike();
    })
  }
}
