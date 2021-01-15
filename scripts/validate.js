
/*const showInputError = (form, input, config) => {
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

        const submitButton = form.querySelector(config.submitButtonSelector);

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            setButtonState(submitButton, false, config);
        })


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
  }); */

  class FormValidator {
    constructor(config, formElement) {
      this._config = config;
      this._selector = formElement;
    }

    _showInputError(form, input, config) {
      const error = form.querySelector(`#${input.id}-error`);
      error.textContent = input.validationMessage;
      input.classList.add(config.inputErrorClass)
    }

    _hideInputError(form, input, config) {
      const error = form.querySelector(`#${input.id}-error`);
      error.textContent = '';
      input.classList.remove(config.inputErrorClass)
    }

    _checkInputValidity(form, input, config) {
      !input.validity.valid ? this._showInputError(form, input, config) : this._hideInputError(form, input, config)
    }

    _setButtonState(button, isActive, config) {
      if(isActive) {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
      }
      else {
          button.classList.add(config.inactiveButtonClass);
          button.disabled = true;
      }
    }

    _setEventListeners(form, config) {
      const inputsList = form.querySelectorAll(config.inputSelector);
      const submitButton = form.querySelector(config.submitButtonSelector);

      inputsList.forEach((input) => {
          input.addEventListener('input', () => {
              this._checkInputValidity(form, input, config);
              this._setButtonState(submitButton, form.checkValidity(), config);
          })
      })
    }

    enableValidation() {
      console.log(this._selector)
      this._setEventListeners(this._selector, this._config);

      const submitButton = this._selector.querySelector(this._config.submitButtonSelector);

      this._selector.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._setButtonState(submitButton, false, this._config);
      })

      this._setButtonState(submitButton, this._selector.checkValidity(), this._config);
    }

  }


// создание валидатора для каждой формы

document.querySelectorAll('.popup__form').forEach((item) => {
  const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_state_disActive',
    inputErrorClass: 'popup__input_state_invalid',
    errorClass: 'popup__input-error'
  }
  const validator = new FormValidator(config, item);
  console.log(validator)

  validator.enableValidation()
})
