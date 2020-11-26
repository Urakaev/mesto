
const showInputError = (form, input, config) => {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass)
}

const hideInputError = (form, input, config) => {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(config.inputErrorClass)
}

const checkInputValidity = (form, input, config) => {
    !input.validity.valid ? showInputError(form, input, config) : hideInputError(form, input, config)
}

const setButtonState = (button, isActive, config) => {
    if(isActive) {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    }
    else {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    }
}


const setEventListeners = (form, config) => {
    const inputsList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputsList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, config);
            setButtonState(submitButton, form.checkValidity(), config);
        })
        
    })
}

const enableValidation = (config) => {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach((form) => {
        setEventListeners(form, config);
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        const submitButton = form.querySelector(config.submitButtonSelector);
        setButtonState(submitButton, form.checkValidity(), config);
    })
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_state_disActive',
    inputErrorClass: 'popup__input_state_invalid',
    errorClass: 'popup__input-error'
  }); 