// info card nodes 

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

// заполняем заголовок и подзаголовок 

function fillInfo () {
    userName.textContent = popupName.value;
    userProf.textContent = popupTitle.value;
}

// туглим попап

function togglePopup () {
    popup.classList.toggle('popup_opened')
}

// переключаем попап и заполняем поля 

function toggleAndFill () {
    togglePopup();
    fillFields();
}

// записываем из инпутов, выключаем попап 

function formSubmitHandler (e) {
    e.preventDefault(); 
    fillInfo();
    togglePopup();
}

// вешаем слушатели 

editProfileBtn.addEventListener('click', toggleAndFill);
closePopupBtn.addEventListener('click', togglePopup);
document.addEventListener('keydown', function(event) {
    const {key} = event; 
    if (key === "Escape") {
        togglePopup();
    }
})
formElement.addEventListener('submit', formSubmitHandler); 


