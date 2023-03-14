//Функция показа текста ошибок

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(errorElement);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

//Функция скрытия текста ошибок
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(errorElement);
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};

//Функция проверки валидности импутов

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    console.log('импут валиден');
  } else {
    hideInputError(formElement, inputElement);
    console.log('инпут не валиден');
  }
};

//Функция слушателей на формы

const setEventListeners = formElement => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', evt => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//Функция деактивации кнопки формы
const disableSubmitButton = buttonElement => {
  buttonElement.classList.add('popup__button_disabled');
  buttonElement.setAttribute('disabled', true);
};

//Функция активации кнопки формы
const enableSubmitButton = buttonElement => {
  buttonElement.classList.remove('popup__button_disabled');
  buttonElement.removeAttribute('disabled');
};

// Ф-ия проверки на невалидность полей формы

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};
//Функция блокировки/разблокировки кнопки Submit

const toggleButtonState = (inputList, buttonElement) => {
  if (!hasInvalidInput(inputList)) {
    enableSubmitButton(buttonElement);
  } else {
    disableSubmitButton(buttonElement);
  }
};

//Функция валидации форм

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();
