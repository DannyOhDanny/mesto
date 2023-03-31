class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this._formElement = formElement;
    this._submit = this._formElement.querySelector(this.settings.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this.settings.inputSelector));
    this._inputErrorClass = this.settings.inputErrorClass;
    this._errorClass = this.settings.errorClass;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    console.log(errorElement);
    errorElement.textContent = errorMessage;
    console.log(errorElement.textContent);
    errorElement.classList.add(this._errorClass);
    console.log(errorElement.classList);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    console.log(errorElement);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
      console.log('импут не валиден');
    } else {
      this._hideInputError(inputElement);
      console.log('импут валиден');
    }
  }

  _disableSubmitButton() {
    this._submit.classList.add(this.settings.inactiveButtonClass);
    this._submit.setAttribute('disabled', true);
  }

  _enableSubmitButton() {
    this._submit.classList.remove(this.settings.inactiveButtonClass);
    this._submit.removeAttribute('disabled');
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    this._disableSubmitButton();
    if (!this._hasInvalidInput(this.inputList)) {
      this._enableSubmitButton();
    } else {
      this._disableSubmitButton();
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._enableSubmitButton();
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener('reset', () => {
      this._disableSubmitButton();
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export { FormValidator };
