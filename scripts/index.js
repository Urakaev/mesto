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

// записываем из инпутов 

function formSubmitHandler (e) {
    e.preventDefault(); 

    let nameFromForm = popupName.value;
    let titleFromForm = popupTitle.value;

    userName.textContent = nameFromForm;
    userProf.textContent = titleFromForm;

    togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 

