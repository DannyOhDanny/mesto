// Импорт стилей CSS
import './index.css';

//Импорт констант
import {
  initialCards,
  settings,
  elementsContainer,
  profileButtonAdd,
  profileButtonEdit,
  userNameInput,
  userPositionInput,
  titleInput,
  urlInput,
  cardSection
} from '../utils/constants.js';

//Импорт классов в файл index.js
import Card from '../script/Card.js';
import Section from '../script/Section.js';
import FormValidator from '../script/FormValidator.js';
import PopupWithImage from '../script/PopupWithImage.js';
import PopupWithForm from '../script/PopupWithForm.js';
import UserInfo from '../script/UserInfo.js';

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
//Cлушатели на попап
popupEditProfile.setEventListeners();

//Слушатели на иконку редактирования профиля и вставка дефолтного значения в поля формы
profileButtonEdit.addEventListener('click', () => {
  popupEditProfile.open();
  editProfileFormPopup.resetValidation();
  const profileInfo = userProfileInfo.getUserInfo();
  userNameInput.value = profileInfo.username;
  userPositionInput.value = profileInfo.userinfo;
});

//3.Попап добавления карточки PopupWithForm
const popupAddCard = new PopupWithForm('#add-popup', {
  callbackSubmit: () => {
    const newCard = {
      name: titleInput.value,
      link: urlInput.value
    };
    popupAddCard.addCard(newCard);
    popupAddCard.close();
  }
});
//Cлушатели на попап карточки
popupAddCard.setEventListeners();
//Слушатели на иконку добавления карточки
profileButtonAdd.addEventListener('click', () => {
  popupAddCard.open();
  addCardFormPopup.resetValidation();
});
