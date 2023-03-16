//Функция показа текста ошибок

const showInputError = (formElement, inputElement, errorMessage, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(errorElement);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//Функция скрытия текста ошибок
const hideInputError = (formElement, inputElement, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(errorElement);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//Функция проверки валидности импутов

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings.errorClass);
    console.log('импут валиден');
  } else {
    hideInputError(formElement, inputElement, settings.errorClass);
    console.log('импут не валиден');
  }
};

//Функция слушателей на формы

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings);

  formElement.addEventListener('reset', () => {
    disableSubmitButton(buttonElement, settings);
  });

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', evt => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

//Функция деактивации кнопки формы
const disableSubmitButton = (buttonElement, settings) => {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
};

//Функция активации кнопки формы
const enableSubmitButton = (buttonElement, settings) => {
  buttonElement.classList.remove(settings.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
};

// Ф-ия проверки на невалидность полей формы

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};
//Функция блокировки/разблокировки кнопки Submit

const toggleButtonState = (inputList, buttonElement, settings) => {
  disableSubmitButton(buttonElement, settings);
  if (!hasInvalidInput(inputList)) {
    enableSubmitButton(buttonElement, settings);
  } else {
    disableSubmitButton(buttonElement, settings);
  }
};

//Функция валидации форм

const enableValidation = settings => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
