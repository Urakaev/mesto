import Section from './Section.js';
import Card from './Сard.js';
import Popup from './Popup.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';
import {
    initialCards,
    mestoCardContainer
} from './constants.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';

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




// вся работа с карточками мест


//создаём карточки и добавляем их в разметку

const createCard = (item) => {
  const card = new Card({
    data: item,
    handleCardClick: (place, link) => {
        const imagePopup = new PopupWithImage('.popup_show-image');
        imagePopup.open(place, link);


    }
  }, '.picture-card-template')
  return card //записываем в карточку экземпляр класса, передаём туда параметр item(это элемент массива данных) и шаблон карточки
}

/*initialCards.forEach((item) => {
    const cardElement = createCard(item);
    addCards(cardElement);
})*/
const cardsList = new Section({ //создаём новый экзмпляр
    data: initialCards, // в дату передаём массив извне
    renderer: (item) => { //функция инструкция

      const cardElement = createCard(item).generateCard(); // для результата функции createCard вызываем метод который создаёт разметку карточки

      cardsList.addItems(cardElement); // вставка только что созданной карточки
      },
    },
    mestoCardContainer // второй параметр - строка с названием селектора куда будем вставлять
  );

  cardsList.renderItems() // создание стартовых карточек

// обработчики включения попапов

// профиль
const userSelectors = {
  nameSelector: '.user-info__name',
  profSelector: '.user-info__profession'
}

const userInfoObj = new UserInfo(userSelectors)
let userInfo = userInfoObj.getUserInfo();

editProfileBtn.addEventListener('click', () => {
  const formPopup = new PopupWithForm({
    popupSelector: '.popup_edit-user-profile',
    submitFormHandler: (dataFromForm) => {
      userInfo = userInfoObj.setUserInfo(dataFromForm);

    }
  });

  formPopup.open()
    // заполняем поля

    function fillEditUserProfilePopupFilelds(data) {
      profilePopupName.value = data.name;
      profilePopupTitle.value = data.about;
    }
    fillEditUserProfilePopupFilelds(userInfo)

});

// место

addCardBtn.addEventListener('click', () => {
  const formPopup = new PopupWithForm({
    popupSelector: '.popup_add-card',
    submitFormHandler: (dataFromForm) => {
      const cardsList = new Section({
        data: dataFromForm,
        renderer: (item) => {

          const cardElement = createCard(item).generateCard();

          cardsList.addItem(cardElement);
          },
        },
        mestoCardContainer
      );

      cardsList.renderItem()

    }
  });
  formPopup.open()

})
// хендлер сабмита попап профиля

/*function handleProfileFormSubmit (e) {

    const nameFromForm = profilePopupName.value;
    const titleFromForm = profilePopupTitle.value;

    userName.textContent = nameFromForm;
    userProf.textContent = titleFromForm;

    closePopup(popupProfile);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);*/


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

/*const clearTagsImgPopup = () => {
    popupBigPicture.src = '';
    popupBigPicture.alt = '';
    popupImage.querySelector('.popup__title').textContent = '';
}*/


