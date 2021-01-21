export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const mestoCardContainer = '.pictures-grid';
const editProfileBtn = document.querySelector('.user-info__edit-button');
const addCardBtn = document.querySelector('.add-picture-button');

const popupProfile = document.querySelector('.popup_edit-user-profile');
const profileFormElement = popupProfile.querySelector('.popup__form');
const popupPlace = document.querySelector('.popup_add-card');
const placeFormElement = popupPlace.querySelector('.popup__form');

const profilePopupName = popupProfile.querySelector('.popup__input_type_name');
const profilePopupTitle = popupProfile.querySelector('.popup__input_type_profession');
export {mestoCardContainer, 
        editProfileBtn,
        addCardBtn,
        profileFormElement,
        placeFormElement,
        profilePopupName,
        profilePopupTitle
}