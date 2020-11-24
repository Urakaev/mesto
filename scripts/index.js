// info-card nodes 

const userName = document.querySelector('.user-info__name')
const userProf = document.querySelector('.user-info__profession')
const editProfileBtn = document.querySelector('.user-info__edit-button');

// cards nodes

const addCardBtn = document.querySelector('.add-picture-button');

// popup nodes

const popupProfile = document.querySelector('.popup_edit-user-profile');
const popupPlace = document.querySelector('.popup_add-card');
const popupImage = document.querySelector('.popup_show-image');


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

function fillImgPopup (node) {
    const popupTitle = popupImage.querySelector('.popup__title');
    popupTitle.textContent = node.querySelector('.picture-card__title').textContent;

    const popupImg = popupImage.querySelector('.popup__picture');
    popupImg.src = node.querySelector('.picture-card__picture').src;
    popupImg.alt = node.querySelector('.picture-card__title').textContent;
}
// туглим попап

function togglePopup (node) {
    node.classList.toggle('popup_opened')
}

// вся работа с карточками мест

const mestoCardContainer = document.querySelector('.pictures-grid');

const createCard = (card) => {
    const mestoCard = document.querySelector('.picture-card-template').content.cloneNode(true);
    const picture = mestoCard.querySelector('.picture-card__picture');

    mestoCard.querySelector('.picture-card__title').textContent = card.name;
    picture.src = card.link;
    picture.alt = card.name;

    // вешаем открытие попапа с изображением на каждый элемент

    const imgBtn = mestoCard.querySelector('.picture-card__imgBtn');
    imgBtn.addEventListener('click', (event) => {
        const cardNode = event.target.closest('.picture-card');
        togglePopup(popupImage);
        fillImgPopup(cardNode);
    })   
    
    // вешаем лайк 
    
    const likeBtn = mestoCard.querySelector('.picture-card__like');
    likeBtn.addEventListener('click', () => {
        likeBtn.classList.toggle('picture-card__like_active'); 
    })

    // удаление карточки 

    const delBtn = mestoCard.querySelector('.picture-card__delButton');
    delBtn.addEventListener('click', event => {
        const cardNode = event.target.closest('.picture-card');
        if (cardNode) {
            cardNode.remove();
        }
    })
    return mestoCard
}

// функция для добавления карточек при загрузке страницы

const addCards = (card) => {
    mestoCardContainer.append(card);
}

// функция для добавления карточки при нажатии на сабмит

const addCard = (card) => {
    mestoCardContainer.prepend(card);
}

// создаём карточки 

const cardNodes = initialCards.map(function(card) {
    return createCard(card)
  });

// добавляем на страницу карточки 

cardNodes.forEach(addCards);

// обработчики включения попапов 

// профиль

editProfileBtn.addEventListener('click', () => {
    togglePopup(popupProfile);
    fillEditUserProfilePopupFilelds();
});

// место

addCardBtn.addEventListener('click', () => {
    togglePopup(popupPlace);
});

// хендлер сабмита попап профиля

function profileFormSubmitHandler (e) {
    e.preventDefault(); 

    const nameFromForm = profilePopupName.value;
    const titleFromForm = profilePopupTitle.value;

    userName.textContent = nameFromForm;
    userProf.textContent = titleFromForm;

    togglePopup(popupProfile);
}

profileFormElement.addEventListener('submit', profileFormSubmitHandler); 

// хендлер сабмита попап места 

function placeFormSubmitHandler (e) {
    e.preventDefault(); 

    const singleCard = {};

    singleCard.name = placeName.value;
    singleCard.link = placeLink.value;

    // создаём карточку

    const cardNode = createCard(singleCard);
  

    // добавляем на страницу эту карточку

    addCard(cardNode);
    togglePopup(popupPlace);
    
}

placeFormElement.addEventListener('submit', placeFormSubmitHandler); 

// закрытие попапов

closeProfilePopupBtn.addEventListener('click', () => {
    togglePopup(popupProfile);
});

closePlacePopupBtn.addEventListener('click', () => {
    togglePopup(popupPlace);
});

closeImagePopupBtn.addEventListener('click', () => {
    popupImage.querySelector('.popup__picture').src = '';
    popupImage.querySelector('.popup__title').textContent = '';
    togglePopup(popupImage);
});
