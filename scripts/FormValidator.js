export default class FormValidator {
    constructor(config, formElement) {
      this._config = config;
      this._selector = formElement;
    }

    _showInputError(input) {
      const error = this._selector.querySelector(`#${input.id}-error`);
      error.textContent = input.validationMessage;
      input.classList.add(this._config.inputErrorClass)
    }

    _hideInputError(input) {
      const error = this._selector.querySelector(`#${input.id}-error`);
      error.textContent = '';
      input.classList.remove(this._config.inputErrorClass)
    }

    _checkInputValidity(input) {
      !input.validity.valid ? this._showInputError(input) : this._hideInputError(input)
    }

    _setButtonState(isActive) {
      if(isActive) {
        this._submitButton.classList.remove(this._config.inactiveButtonClass);
        this._submitButton.disabled = false;
      }
      else {
        this._submitButton.classList.add(this._config.inactiveButtonClass);
        this._submitButton.disabled = true;
      }
    }

    _setEventListeners() {
      this._inputList = this._selector.querySelectorAll(this._config.inputSelector);
      this._submitButton = this._selector.querySelector(this._config.submitButtonSelector);

      this._inputList.forEach((input) => {
          input.addEventListener('input', () => {
              this._checkInputValidity(input);
              this._setButtonState(this._selector.checkValidity());
          })
      })
    }

    enableValidation() {
      this._setEventListeners();

      //const submitButton = this._selector.querySelector(this._config.submitButtonSelector);

      this._selector.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._setButtonState(false);
      })

      this._setButtonState(this._selector.checkValidity());
    }

  }



