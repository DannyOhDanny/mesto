//Функция показа текста ошибок

const showInputError = (errorElement, errorMessage, errorClassVisible) => {
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClassVisible);
};

const hideInputError = (errorElement, errorClassVisible) => {
  errorElement.classList.remove(errorClassVisible);
  errorElement.textContent = '';
};

//Функция проверки валидности импутов

const checkInputValidity = (inputElement, errorClassVisible) => {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  console.log(errorElement);
  if (!inputElement.validity.valid) {
    showInputError(errorElement, inputElement.validationMessage, errorClassVisible);
    console.log('импут валиден');
  } else {
    hideInputError(errorElement);
    console.log('инпут не валиден');
  }
};

// Ф-ия проверки на валидность полей
const hasInvalidInput = inputList => {
  console.log(inputList);
  return Array.from(inputList).some(inputElement => !inputElement.validity.valid);
};

//Функция блокировки/разблокировки кнопки Submit

//Функция слушателей на формы

const setEventListeners = (formElements, inputList, errorClassVisible) => {
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', evt => {
      checkInputValidity(inputElement, errorClassVisible);
    });
  });

  formElements.forEach = formElement => {
    formElement.addEventlistener('submit', evt => {
      evt.preventDefault();
    });
  };
};

//Функция валидации форм

const enableValidation = config => {
  const inputList = document.querySelectorAll('.popup__input');
  const formElements = document.querySelectorAll('.popup__form');
  setEventListeners(formElements, inputList, config.errorClassVisible);
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClassSample: '.popup__input_type_',
  errorClass: '.popup__error',
  errorClassVisible: 'popup__error_visible',
  validButtonClass: 'popup__button',
  disbledButtonClass: 'popup__button_disabled'
});

/*
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = formElement => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  /*toggleButtonState(inputList, buttonElement);

  formElement.addEventListener('submit', evt => {
    evt.preventDefault();
  });

  const hasInvalidInput = inputList => {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(formElement, inputElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__set'));
    fieldsetList.forEach(fieldSet => {
      setEventListeners(fieldSet);
    });
  });
};

enableValidation();

const disableSubmitButton = buttonElement => {
  buttonElement.setAttribute('disabled', 'true');
  buttonElement.classList.add('popup__button_disabled');
};

const enableSubmitButton = buttonElement => {
  buttonElement.classList.remove('popup__button_disabled');
  buttonElement.removeAttribute('disabled');
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement);
  } else {
    enableSubmitButton(buttonElement);
  }
};
*/
