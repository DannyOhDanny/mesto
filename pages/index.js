// Импорт стилей CSS
import './index.css';

//Импорт классов в файл index.js
import Card from '../script/Card.js';
import Section from '../script/Section.js';
import FormValidator from '../script/FormValidator.js';
import PopupWithImage from '../script/PopupWithImage.js';
import PopupWithForm from '../script/PopupWithForm.js';
import UserInfo from '../script/UserInfo.js';

// Импорт картинок
const solnechnogorsk = new URL('../images/element_pic-4.jpg', import.meta.url);
const kurshskayaKosa = new URL('../images/element_pic-5.jpg', import.meta.url);
const vyborg = new URL('../images/element_pic-6.jpg', import.meta.url);

//Исходный массив
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
    link: solnechnogorsk
  },
  {
    name: 'Куршская коса',
    link: kurshskayaKosa
  },
  {
    name: 'Выборг',
    link: vyborg
  }
];

//Объект - конфигуратор со свойствами селекторов и классов
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Константы
const elementsContainer = document.querySelector('.elements');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonAdd = document.querySelector('.profile__button-add');
const userNameInput = document.querySelector('.popup__input_type_name');
const userPositionInput = document.querySelector('.popup__input_type_position');
const titleInput = document.querySelector('.popup__input_type_heading');
const urlInput = document.querySelector('.popup__input_type_url');
const cardSection = '.elements';

/*//Слушатели на формы
addCardForm.addEventListener('submit', handleAddCardForm);
editProfileForm.addEventListener('submit', handleProfileFormSubmit);
profileButtonAdd.addEventListener('click', function () {
  openPopup(addCardPopup);
  addCardFormPopup.resetValidation();
});*/

/*//Функция редактирования профиля
function handleProfileFormSubmit(evt) {
evt.preventDefault();
nameHTML.textContent = userNameInput.value;
positionHTML.textContent = userPositionInput.value;
}*/

/*//Передача инфо из импута в карточку добавления изображения
function handleAddCardForm(evt) {
  evt.preventDefault();
  const element = {
    name: titleInput.value,
    link: urlInput.value
  };
  addCard(element);
  evt.target.reset();
  closePopup(addCardPopup);
}*/

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

/*//Вызов функции, создающей карточки из массива
initialCards.forEach(createCard);*/

/*//Присовение значений попапу изображения
function handleImgPopup(evt) {
  openPopup(imagePopup);
  modalImg.src = evt.target.src;
  modalImg.alt = evt.target.alt;
  modalCaption.textContent = evt.target.alt;
}*/

/*//Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}*/

/* //Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}*/

/*//Закрытие каждого попапа по нажатию на фон попапа и на кнопку-крестик
popupWindows.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  });
});*/

/*//Закрытие каждого попапа по нажатию на Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}*/

/*//Добавление готовых карточек из массива в document через функции
initialCards.forEach(item => {
  createCardElement(item);
  addCard(item);
});*/

//Функция вызова готового попапа по клику на изображение
function handleCardClick(title, link) {
  popupOpenImage.open(title, link);
}

//Добавление новых карточек в document через Класс Card
function createCardElement(item) {
  const card = new Card(item, '#element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

//Код, добавляющий любые карточки в DOM
function addCard(element) {
  const elementTemplate = createCardElement(element);
  elementsContainer.prepend(elementTemplate);
}

//Добавление готовых карточек из массива в document через класс Section
const cardList = new Section(
  {
    items: initialCards,
    renderer: cardItem => {
      const card = new Card(cardItem, '#element-template', handleCardClick);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  },
  cardSection
);
//Вызов рендера карточек
cardList.renderItems();

//Вызов класса FormValidator для попапов и активация валидации импутов к ним
const addCardFormPopup = new FormValidator(settings, document.forms['card-form']);
addCardFormPopup.enableValidation();

const editProfileFormPopup = new FormValidator(settings, document.forms['profile-form']);
editProfileFormPopup.enableValidation();

//Вызов класса UserInfo с селекторами
const userProfileInfo = new UserInfo({
  usernameSelector: '.profile__name',
  userinfoSelector: '.profile__position'
});

//1. Попап изображения PopupWithImage
//Объявление класса PopupOpenImage с открывающимся изображением
const popupOpenImage = new PopupWithImage('#image-popup');
popupOpenImage.setEventListeners();

//2. Попап редактирования инфо профиля PopupWithForm
//Вызываем класс PopupWithForm с селекторами и колбэком
const popupEditProfile = new PopupWithForm('#edit-popup', {
  callbackSubmit: userData => {
    const newInfo = { username: userData.name, userinfo: userData.position };
    userProfileInfo.setUserInfo(newInfo);
    popupEditProfile.close();
  }
});
//Навешиваем слушатели на попап
popupEditProfile.setEventListeners();
//Слушатели на иконку редактирования профиля и вставка дефолтного значения в поля формы
profileButtonEdit.addEventListener('click', () => {
  popupEditProfile.open();
  userNameInput.value = userProfileInfo.getUserInfo().username;
  userPositionInput.value = userProfileInfo.getUserInfo().userinfo;
});

//3.Попап добавления карточки PopupWithForm
const popupAddCard = new PopupWithForm('#add-popup', {
  callbackSubmit: () => {
    const newCard = {
      name: titleInput.value,
      link: urlInput.value
    };
    addCard(newCard);
    popupAddCard.close();
  }
});
//Навешиваем слушатели на попап карточки
popupAddCard.setEventListeners();
//Слушатели на иконку добавления карточки
profileButtonAdd.addEventListener('click', () => {
  popupAddCard.open();
  addCardFormPopup.resetValidation();
});
