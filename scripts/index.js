const initialCards = [
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

// info-card nodes 

const userName = document.querySelector('.user-info__name')
const userProf = document.querySelector('.user-info__profession')
const editProfileBtn = document.querySelector('.user-info__edit-button');

// cards nodes

const addCardBtn = document.querySelector('.add-picture-button');

// popup nodes

const popupProfile = document.querySelector('#popupContentProfile');
const popupPlace = document.querySelector('#popupContentPlace');

const profilePopupName = popupProfile.querySelector('.popup__input_type_name');
const profilePopupTitle = popupProfile.querySelector('.popup__input_type_title');
const profileFormElement = popupProfile.querySelector('.popup__form');

const placeName = popupPlace.querySelector('.popup__input_type_name');
const placeLink = popupPlace.querySelector('.popup__input_type_title');
const placeFormElement = popupPlace.querySelector('.popup__form');

const closePopupBtns = document.querySelectorAll('.popup__close-button');

// заполняем поля

function fillFields () {
    profilePopupName.value = userName.textContent;
    profilePopupTitle.value = userProf.textContent;  
}

// туглим попап

function togglePopup (node) {
    node.classList.toggle('popup_opened')
}

// обработчики включения попапов 

editProfileBtn.addEventListener('click', () => {
    togglePopup(popupProfile);
    fillFields();
});

addCardBtn.addEventListener('click', () => {
    togglePopup(popupPlace);
});

// закрытие попапа

closePopupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const popupNode = btn.closest('.popup');
        togglePopup(popupNode);
    });
})

document.addEventListener('keydown', function(event) {
    const {key} = event; 
    if (key === "Escape") {
        togglePopup();
    }
})

// записываем из инпутов, выключаем попап профиля

function profileFormSubmitHandler (e) {
    e.preventDefault(); 

    const nameFromForm = profilePopupName.value;
    const titleFromForm = profilePopupTitle.value;

    userName.textContent = nameFromForm;
    userProf.textContent = titleFromForm;

    togglePopup(popupProfile);
}

profileFormElement.addEventListener('submit', profileFormSubmitHandler); 

// записываем из инпутов, выключаем попап места 

function placeFormSubmitHandler (e) {
    e.preventDefault(); 

    let singleCard = {}

    singleCard.name = placeName.value;
    singleCard.link = placeLink.value;
    
    renderMestoCard(singleCard, 'prepend');
    togglePopup(popupPlace);
}

placeFormElement.addEventListener('submit', placeFormSubmitHandler); 

// вся работа с карточками мест

const mestoCardContainer = document.querySelector('.pictures-grid');

const renderMestoCard = (card, dir) => {
    const mestoCard = document.querySelector('.picture-card-template').content.cloneNode(true);

    mestoCard.querySelector('.picture-card__title').textContent = card.name;
    mestoCard.querySelector('.picture-card__picture').src = card.link;
    mestoCard.querySelector('.picture-card__picture').alt = card.name;

    const delBtn = mestoCard.querySelector('.picture-card__delButton');
    delBtn.addEventListener('click', event => {
        const cardNode = event.target.closest('.picture-card');
        if (cardNode) {
            cardNode.remove()
        }
    })
    if (dir === 'prepend') {
        mestoCardContainer.prepend(mestoCard);
    }
    else {
        mestoCardContainer.append(mestoCard);
    }
}

initialCards.forEach(card => {
    renderMestoCard(card, 'append'); 
})