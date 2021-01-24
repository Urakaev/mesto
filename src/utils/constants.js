const mestoCardContainer = '.pictures-grid';
const editProfileBtn = document.querySelector('.user-info__edit-button');
const addCardBtn = document.querySelector('.add-picture-button');

const popupProfile = document.querySelector('.popup_edit-user-profile');
const profileFormElement = popupProfile.querySelector('.popup__form');
const popupPlace = document.querySelector('.popup_add-card');
const placeFormElement = popupPlace.querySelector('.popup__form');

const profilePopupName = popupProfile.querySelector('.popup__input_type_name');
const profilePopupTitle = popupProfile.querySelector('.popup__input_type_profession');

const popupEditAvatar = document.querySelector('.popup_edit-avatar');
const editAvatarForm = popupEditAvatar.querySelector('.popup__form');
const editAvatarBtn = document.querySelector('.user-info__edit-avatar')

export {mestoCardContainer, 
        editProfileBtn,
        addCardBtn,
        profileFormElement,
        placeFormElement,
        profilePopupName,
        profilePopupTitle,
        editAvatarForm,
        editAvatarBtn
}