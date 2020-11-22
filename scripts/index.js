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

// popup nodes

const popup = document.querySelector('.popup');
const popupName = popup.querySelector('.popup__input_type_name');
const popupTitle = popup.querySelector('.popup__input_type_title');
const closePopupBtn = popup.querySelector('.popup__close-button');
const formElement = popup.querySelector('.popup__form');

// заполняем поля

function fillFields () {
    popupName.value = userName.textContent;
    popupTitle.value = userProf.textContent;  
}

// туглим попап

function togglePopup () {
    popup.classList.toggle('popup_opened')
}

editProfileBtn.addEventListener('click', () => {
    togglePopup();
    fillFields();
});

closePopupBtn.addEventListener('click', togglePopup);

document.addEventListener('keydown', function(event) {
    const {key} = event; 
    if (key === "Escape") {
        togglePopup();
    }
})

// записываем из инпутов, выключаем попап 

function formSubmitHandler (e) {
    e.preventDefault(); 

    let nameFromForm = popupName.value;
    let titleFromForm = popupTitle.value;

    userName.textContent = nameFromForm;
    userProf.textContent = titleFromForm;

    togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 


// вся работа с карточками мест

const mestoCardContainer = document.querySelector('.pictures-grid');

const renderMestoCard = (card) => {
    const mestoCard = document.querySelector('.picture-card-template').content.cloneNode(true)

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

    mestoCardContainer.append(mestoCard)
}

initialCards.forEach(renderMestoCard)