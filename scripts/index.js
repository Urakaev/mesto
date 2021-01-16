import Card from './card.js';
import FormValidator from './FormValidator.js';
// info-card nodes

const userName = document.querySelector('.user-info__name')
const userProf = document.querySelector('.user-info__profession')
const editProfileBtn = document.querySelector('.user-info__edit-button');

// cards nodes

const addCardBtn = document.querySelector('.add-picture-button');

// popup nodes

const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_edit-user-profile');
const popupPlace = document.querySelector('.popup_add-card');
const popupImage = document.querySelector('.popup_show-image');
const popupBigPicture = popupImage.querySelector('.popup__picture');


const profilePopupName = popupProfile.querySelector('.popup__input_type_name');
const profilePopupTitle = popupProfile.querySelector('.popup__input_type_profession');
const profileFormElement = popupProfile.querySelector('.popup__form');

const placeName = popupPlace.querySelector('.popup__input_type_card-name');
const placeLink = popupPlace.querySelector('.popup__input_type_link');
const placeFormElement = popupPlace.querySelector('.popup__form');

const closeProfilePopupBtn = popupProfile.querySelector('.popup__close-button');
const closePlacePopupBtn = popupPlace.querySelector('.popup__close-button');
const closeImagePopupBtn = popupImage.querySelector('.popup__close-button');

// заполняем поля

function fillEditUserProfilePopupFilelds () {
    profilePopupName.value = userName.textContent;
    profilePopupTitle.value = userProf.textContent;
}

// туглим попап

const openPopup = (node) => {
    node.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscPress);
}

const closePopup = (node) => {
    node.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscPress);
}

// вешаем esc на документ

function handleEscPress(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
        clearTagsImgPopup();

    }
}

// вся работа с карточками мест

const mestoCardContainer = document.querySelector('.pictures-grid');


// функция для добавления карточек при загрузке страницы

const addCards = (card) => {
    mestoCardContainer.append(card);

}

// функция для добавления карточки при нажатии на сабмит

const addCard = (card) => {
    mestoCardContainer.prepend(card);
}


//создаём карточки и добавляем их в разметку

const createCard = (item) => {
    const card = new Card(item, '.picture-card-template');
    const cardElement = card.generateCard();

    return cardElement;
}

initialCards.forEach((item) => {
    const cardElement = createCard(item);
    addCards(cardElement);
})

// обработчики включения попапов

// профиль

editProfileBtn.addEventListener('click', () => {
    openPopup(popupProfile);
    fillEditUserProfilePopupFilelds();
});

// место

addCardBtn.addEventListener('click', () => {
    openPopup(popupPlace);
});

// хендлер сабмита попап профиля

function handleProfileFormSubmit (e) {

    const nameFromForm = profilePopupName.value;
    const titleFromForm = profilePopupTitle.value;

    userName.textContent = nameFromForm;
    userProf.textContent = titleFromForm;

    closePopup(popupProfile);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// хендлер сабмита попап места

function handlePlaceFormSubmit (e) {

    const singleCard = {};

    singleCard.name = placeName.value;
    singleCard.link = placeLink.value;

    //создаём карточку и добавляем на страницу эту карточку

    const cardElement = createCard(singleCard);

    addCard(cardElement);
    closePopup(popupPlace);

    placeFormElement.reset();

}

placeFormElement.addEventListener('submit', handlePlaceFormSubmit);

// создание валидатора для каждой формы

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_state_disActive',
    inputErrorClass: 'popup__input_state_invalid',
    errorClass: 'popup__input-error'
}

  
const profileFormValidator = new FormValidator(config, profileFormElement);
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(config, placeFormElement);
placeFormValidator.enableValidation();

// очистка попапа с изображением

const clearTagsImgPopup = () => {
    popupBigPicture.src = '';
    popupBigPicture.alt = '';
    popupImage.querySelector('.popup__title').textContent = '';
}

// закрытие попапов

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        const currentPopup = evt.target
        if(currentPopup.classList.contains('popup')){
            if (currentPopup.classList.contains('popup_show-image')){
                clearTagsImgPopup();
            }
            closePopup(popup);
        }
    })
})

closeProfilePopupBtn.addEventListener('click', () => {
    closePopup(popupProfile);
});

closePlacePopupBtn.addEventListener('click', () => {
    closePopup(popupPlace);
});

closeImagePopupBtn.addEventListener('click', () => {
    clearTagsImgPopup();
    closePopup(popupImage);
});


