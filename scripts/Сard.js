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
    this._element.querySelector('.picture-card__picture').addEventListener('click', () =>{
      this._handleCardClick(this._name, this._link);
    })
    this._element.querySelector('.picture-card__delButton').addEventListener('click', () =>{
      this._removeCard();
    })
    this._element.querySelector('.picture-card__like').addEventListener('click', () =>{
      this._toggleLike();
    })
  }
}
