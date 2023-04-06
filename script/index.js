// Импорт классов в файл index.js

import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// Исходный массив
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Солнечногорск',
    link: 'https://dannyohdanny.github.io/mesto/images/element_pic-4.jpg'
  },
  {
    name: 'Куршская коса',
    link: 'https://dannyohdanny.github.io/mesto/images/element_pic-5.jpg'
  },
  {
    name: 'Выборг',
    link: 'https://dannyohdanny.github.io/mesto/images/element_pic-6.jpg'
  }
];

// Объект- конфигуратор со свойствами
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Константы
const elementsContainer = document.querySelector('.elements');
const editProfileForm = document.forms['profile-form'];
const addCardForm = document.forms['card-form'];
const editProfilePopup = document.querySelector('#edit-popup');
const addCardPopup = document.querySelector('#add-popup');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonAdd = document.querySelector('.profile__button-add');
const nameHTML = document.querySelector('.profile__name');
const positionHTML = document.querySelector('.profile__position');
const userNameInput = document.querySelector('.popup__input_type_name');
const userPositionInput = document.querySelector('.popup__input_type_position');
const titleInput = document.querySelector('.popup__input_type_heading');
const urlInput = document.querySelector('.popup__input_type_url');
const imagePopup = document.querySelector('#image-popup');
const imageHTML = document.querySelector('.element__pic');
const modalCaption = document.querySelector('.popup__title');
const modalImg = document.querySelector('.popup__pic');
const popupWindows = document.querySelectorAll('.popup');
const formList = Array.from(document.querySelectorAll('.popup__form'));

//Слушатели на формы
addCardForm.addEventListener('submit', handleAddCardForm);

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

//Слушатели на иконки форм
profileButtonEdit.addEventListener('click', function () {
  userPositionInput.value = positionHTML.textContent;
  userNameInput.value = nameHTML.textContent;
  openPopup(editProfilePopup);
  editProfileFormPopup.resetValidation();
});

profileButtonAdd.addEventListener('click', function () {
  openPopup(addCardPopup);
  addCardFormPopup.resetValidation();
});

//Функция редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameHTML.textContent = userNameInput.value;
  positionHTML.textContent = userPositionInput.value;
  closePopup(editProfilePopup);
}

/*//Код, собирающий карточку:
function getCard(item) {
  const itemTemplate = document.querySelector('#element-template').content;
  const cardItem = itemTemplate.querySelector('.element').cloneNode(true);
  const cardPicture = cardItem.querySelector('.element__pic');
  const deleteButton = cardItem.querySelector('.element__delete-btn');
  const likeButton = cardItem.querySelector('.element__heart');
  const cardHeading = cardItem.querySelector('.element__title');

  cardPicture.addEventListener('click', cardItem => handleImgPopup(cardItem));

  deleteButton.addEventListener('click', function (evt) {
    cardItem.remove();
  });

  likeButton.addEventListener('click', function (event) {
    event.target.classList.toggle('element__heart_active');
  });

  cardHeading.textContent = item.name;
  cardPicture.setAttribute('src', item.link);
  cardPicture.setAttribute('alt', item.name);

  return cardItem;
}*/

//Вызов функции, создающей карточки из массива
/*initialCards.forEach(createCard);*/

//Передача инфо из импута в карточку добавления изображения
function handleAddCardForm(evt) {
  evt.preventDefault();
  const element = {
    name: titleInput.value,
    link: urlInput.value
  };
  addCard(element);
  evt.target.reset();
  closePopup(addCardPopup);
}

//Присовение значений попапу изображения

/*function handleImgPopup(evt) {
  openPopup(imagePopup);
  modalImg.src = evt.target.src;
  modalImg.alt = evt.target.alt;
  modalCaption.textContent = evt.target.alt;
}*/

function handleCardClick(name, link) {
  modalImg.src = link;
  modalImg.alt = name;
  modalCaption.textContent = name;
  openPopup(imagePopup);
}

//Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

//Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

//Закрытие каждого попапа по нажатию на фон попапа и на кнопку-крестик.
popupWindows.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  });
});

//Закрытие каждого попапа по нажатию на Esc.
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Добавление новых карточек в document через Класс Card.

function createCardElement(item) {
  const card = new Card(item, '#element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}
//Код, добавляющий карточки в DOM
function addCard(element) {
  const elementTemplate = createCardElement(element);
  elementsContainer.prepend(elementTemplate);
}

//Добавление готовых карточек из массива в document через класс Card.
initialCards.forEach(item => {
  const card = new Card(item, '#element-template', handleCardClick);
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
});

//Добавление валидации для всех форм.
formList.forEach(form => {
  const formElement = new FormValidator(settings, form);
  formElement.enableValidation();
});

//Объявление новых индивидуальных переменных к формам через класс
const editProfileFormPopup = new FormValidator(settings, document.forms['profile-form']);
const addCardFormPopup = new FormValidator(settings, document.forms['card-form']);
