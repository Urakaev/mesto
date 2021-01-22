import Section from '../components/Section.js';
import Card from '../components/Сard.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import {
    initialCards,
    mestoCardContainer,
    editProfileBtn,
    addCardBtn,
    profileFormElement,
    placeFormElement,
    profilePopupName,
    profilePopupTitle
} from '../utils/constants.js';
import './index.css'



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
const userInfoObj = new UserInfo(userSelectors);


const formProfilePopup = new PopupWithForm({
  popupSelector: '.popup_edit-user-profile',
  submitFormHandler: (dataFromForm) => {
      userInfoObj.setUserInfo(dataFromForm);
  }
});

editProfileBtn.addEventListener('click', () => {
    const userInfo = userInfoObj.getUserInfo();
    fillEditUserProfilePopupFilelds(userInfo)
    formProfilePopup.open()
    profileFormValidator.clearFormErrors();
});

// место

/* я вынес создание PopupWithForm и по клику вызываю его метод,
но не понимаю как передать dataFromForm если из submitFormHandler вынести создание класса Section*/
/*const newCardsList = new Section({
  data: dataFromForm,
  renderer: (item) => {
      const cardElement = createCard(item).generateCard();
      newCardsList.addItem(cardElement);
  }
},
mestoCardContainer
);
*/
const formPlacePopup = new PopupWithForm({
  popupSelector: '.popup_add-card',
  submitFormHandler: (dataFromForm) => {
    console.log(dataFromForm)
    cardsList.renderItem({ data: dataFromForm})
  }
});



/*click add card */

addCardBtn.addEventListener('click', () => {
  placeFormValidator.clearFormErrors()
  formPlacePopup.open()

})






