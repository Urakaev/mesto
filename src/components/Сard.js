export default class Card {
  constructor({
    link,
    title,
    owner,
    thisUser,
    likes,
    cardId,
    cardSelector,
    handleCardClick,
    handleLikeClick,
    handleDelBtnClick,
  }) {
    this._cardSelector = cardSelector;
    this._image = link;
    this._title = title;
    this._owner = owner;
    this._thisUser = thisUser;
    this._likes = likes;
    this.cardId = cardId;
    this._cardTemplate = document.querySelector(this._cardSelector);
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDelBtnClick = handleDelBtnClick;
    this._delClick = this._delClick.bind(this);
    this._revertHeart = this._revertHeart.bind(this);
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.content
      .querySelector(".picture-card")
      .cloneNode(true);
    return cardElement;
  }

  _revertHeart(evt)  {
    const deleteLike = this._elementLike.classList.contains("picture-card__like_active");
    this._elementLike.classList.toggle("picture-card__like_active");
    this._elementLikeCounter.textContent = this._likes.length + (deleteLike ? -1 : 1);
    this._handleLikeClick(this.cardId, deleteLike, this);
  };

  _delClick(evt) {
    this._handleDelBtnClick(this);
  };

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  likesUpdate(likesArray) {
    this._likes = likesArray;
    this._checkLikes();
  }

  _checkLikes() {
    this._elementLikeCounter.textContent = this._likes.length;
    if (this._likes.findIndex((item) => item._id == this._thisUser) !== -1) {
      this._elementLike.classList.add("picture-card__like_active");
    }
  }

  _setEventListeners() {
    this._elementLike.addEventListener("click", this._revertHeart);
    this._elementDelBtn.addEventListener("click", this._delClick);
    this._picture.addEventListener("click", this._handleCardClick);
  }

  generateCard() {
    this._element = this._getTemplate();

    this._picture = this._element.querySelector(".picture-card__picture");
    this._picture.src = this._image;
    this._picture.alt = this._title;
    this._element.querySelector(".picture-card__title").textContent = this._title;

    this._elementLike = this._element.querySelector(".picture-card__like");
    this._elementLikeCounter = this._element.querySelector(".picture-card__like-counter");

    this._elementDelBtn = this._element.querySelector(".picture-card__delButton");

    if (this._owner !== this._thisUser) {
      this._element
        .querySelector(".picture-card__delButton")
        .classList.add("picture-card__delButton_disable");
    }
    this._checkLikes();
    this._setEventListeners();
    return this._element;
  }
}
