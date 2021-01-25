import Section from '../components/Section.js';
import Card from '../components/Сard.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import {
    editProfileBtn,
    addCardBtn,
    profileFormElement,
    placeFormElement,
    profilePopupName,
    profilePopupTitle,
    editAvatarForm,
    editAvatarBtn
} from '../utils/constants.js';
import './index.css'

let currentUser

// передаем Api токен и id группы в урле

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19/",
  headers: {
    authorization: "e3cff522-5db4-4e70-ac70-f1e7cecd8c6e",
    "Content-Type": "application/json",
  },
  cardsUrl: "cards"
});


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

const avatarEditFormValidator = new FormValidator(config, editAvatarForm);
avatarEditFormValidator.enableValidation();

// вся работа с карточками мест

//создаём карточки и добавляем их в разметку

const imagePopup = new PopupWithImage('.popup_show-image'); //попап с изображением

function createCard(item) {
  return new Card({
    cardSelector: ".picture-card-template",
    link: item.link,
    title: item.name,
    owner: item.owner._id,
    thisUser: currentUser,
    likes: item.likes,
    cardId: item._id,

    handleCardClick: () => {
      imagePopup.open(item.name, item.link); //imagePopup - объект созданый классом PopupWithImage
    },

    handleLikeClick: (likedCardId, deleteLike, cardObject) => {
      api
        .reverseLike(likedCardId, deleteLike)
        .then((res) => {
          cardObject.likesUpdate(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    },


    handleDelBtnClick: (cardObject) => {
      formWithDelConfirm.cardObject = cardObject;
      formWithDelConfirm.open();
    }
  }).generateCard();
}

const cardArray = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardArray.addItem(cardElement, true);
    },
  },
  ".pictures-grid"
);

// профиль

const userSelectors = {
  nameSelector: '.user-info__name',
  profSelector: '.user-info__profession',
  avatarSelector: '.user-info__picture',
  footerNameSelector: '.footer__name'
}

function fillEditUserProfilePopupFilelds(data) {
    profilePopupName.value = data.name;
    profilePopupTitle.value = data.about;
}
const userInfoObj = new UserInfo(userSelectors);

// форма изменения профиля

const formProfilePopup = new PopupWithForm({
  popupSelector: '.popup_edit-user-profile',
  submitFormHandler: (dataFromForm) => {
      const buttonText = formProfilePopup.getButtonText();
      formProfilePopup.setButtonText("Сохранение..");
      api
        .setUserInfo(dataFromForm)
        .then((res) => {
          userInfoObj.setUserInfo({
            name: res.name,
            about: res.about,
          });
          formProfilePopup.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          formProfilePopup.setButtonText(buttonText);
        });
  }
});

// форма изменения аватарки

const formEditAvatar = new PopupWithForm({
  popupSelector: '.popup_edit-avatar',
  submitFormHandler: (dataFromForm) => {
    const buttonText = formEditAvatar.getButtonText();
    formEditAvatar.setButtonText("Сохранение..");
    api
      .setUserAvatar(dataFromForm)
      .then((res) => {
        userInfoObj.setUserAvatar(res.avatar, res.name);
        formEditAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formEditAvatar.setButtonText(buttonText);
      });
  }
});

// форма удаление карточки

const formWithDelConfirm = new PopupWithForm({
  popupSelector: '.popup_del-confirm',
  submitFormHandler: (item) => {
    const buttonText = formWithDelConfirm.getButtonText();
    formWithDelConfirm.setButtonText("Удаление..");
    api
      .delCard(formWithDelConfirm.cardObject)
      .then((res) => {
        formWithDelConfirm.cardObject.deleteCard();
        formWithDelConfirm.close();
        formWithDelConfirm.cardObject = "";
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formWithDelConfirm.setButtonText(buttonText);
      });
  }
});



Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((res) => {
    currentUser = res[0]._id;
    userInfoObj.setUserInfo({
      name: res[0].name,
      about: res[0].about,
    });
    userInfoObj.setUserAvatar(res[0].avatar, res[0].name);
    cardArray.renderItems(res[1]);
  })
  .catch((err) => {
    console.log(err);
  });


// место

const formPlacePopup = new PopupWithForm({
  popupSelector: '.popup_add-card',
  submitFormHandler: (item) => {
    const buttonText = formPlacePopup.getButtonText();
    formPlacePopup.setButtonText("Сохранение..");
    api
      .setNewCard(item)
      .then((res) => {
        const cardElement = createCard(res);
        cardArray.addItem(cardElement, false);
        formPlacePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formPlacePopup.setButtonText(buttonText);
      });
  }
});

// клик по кнопке изменения профиля

editProfileBtn.addEventListener('click', () => {
  const userInfo = userInfoObj.getUserInfo();
  fillEditUserProfilePopupFilelds(userInfo)
  formProfilePopup.open()
  profileFormValidator.clearFormErrors();
});

// клик по кнопке изменения аватарки

editAvatarBtn.addEventListener('click', () => {
formEditAvatar.open()
avatarEditFormValidator.clearFormErrors();
});

/* клик по кнопке добавления карточки */

addCardBtn.addEventListener('click', () => {
placeFormValidator.clearFormErrors()
formPlacePopup.open()
})




