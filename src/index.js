import Section from './Section.js';
import Card from './Сard.js';
import Popup from './Popup.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';
import {
    initialCards,
    mestoCardContainer,
    editProfileBtn,
    addCardBtn,
    profileFormElement,
    placeFormElement,
    profilePopupName,
    profilePopupTitle
} from './constants.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import './pages/index.css'






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

function fillEditUserProfilePopupFilelds(data) {
    profilePopupName.value = data.name;
    profilePopupTitle.value = data.about;
}

editProfileBtn.addEventListener('click', () => {
    const userInfoObj = new UserInfo(userSelectors)
    let userInfo = userInfoObj.getUserInfo();
    fillEditUserProfilePopupFilelds(userInfo)


    const formPopup = new PopupWithForm({
        popupSelector: '.popup_edit-user-profile',
        submitFormHandler: (dataFromForm) => {
            userInfoObj.setUserInfo(dataFromForm);
        }
    });

    formPopup.open()
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
                }
            },
            mestoCardContainer
            );

      cardsList.renderItem()
        }
  });

  formPopup.open()

})

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



