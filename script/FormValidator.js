//Класс FormValidator, осуществляющий валидацию форм на странице
export default class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this._formElement = formElement;
    this._submit = this._formElement.querySelector(this.settings.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this.settings.inputSelector));
    this._inputErrorClass = this.settings.inputErrorClass;
    this._errorClass = this.settings.errorClass;
  }
  //Показываем сообщение об ошибке
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    console.log(errorElement);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    console.log(errorElement.textContent);
    errorElement.classList.add(this._errorClass);
    console.log(errorElement.classList);
  }
  //Скрываем сообщение об ошибке
  _hideInputError = inputElement => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    console.log(errorElement);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = '';
  };
  //Передаем параметры и проверяем валидность
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
      console.log('импут не валиден');
    } else {
      this._hideInputError(inputElement);
      console.log('импут валиден');
    }
  }

  //Функиця очищения ошибок импута
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }
  //Деактивация кнопки сабмита
  _disableSubmitButton() {
    this._submit.classList.add(this.settings.inactiveButtonClass);
    this._submit.setAttribute('disabled', true);
  }
  //Активация кнопки сабмита
  _enableSubmitButton() {
    this._submit.classList.remove(this.settings.inactiveButtonClass);
    this._submit.removeAttribute('disabled');
  }
  //Проверка импутов на невалидность
  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }
  //Переключение кнопки сабмита в зависимости от результата проверки данных импутов
  _toggleButtonState() {
    this._disableSubmitButton();
    if (!this._hasInvalidInput(this.inputList)) {
      this._enableSubmitButton();
    } else {
      this._disableSubmitButton();
    }
  }
  //Слушатели
  _setEventListeners() {
    //Блокируем кнопку
    this._toggleButtonState();
    //Слушаем и проверяем импуты
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._enableSubmitButton();
        this._toggleButtonState();
      });
    });
    //Деактивация кнопки после ресета
    this._formElement.addEventListener('reset', () => {
      this._disableSubmitButton();
    });
  }
  //Вызов метода проверки полей формы
  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      //отмена стандартных действий формы
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
