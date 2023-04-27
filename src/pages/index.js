// Импорт стилей CSS
import './index.css';

//Импорт констант
import {
  settings,
  profileButtonAdd,
  profileButtonEdit,
  userNameInput,
  userPositionInput,
  cardSection
} from '../utils/constants.js';

//Импорт классов в файл index.js
import Card from '../script/Card.js';
import Section from '../script/Section.js';
import FormValidator from '../script/FormValidator.js';
import PopupWithImage from '../script/PopupWithImage.js';
import PopupWithForm from '../script/PopupWithForm.js';
import UserInfo from '../script/UserInfo.js';
import Api from '../script/Api.js';

//Объявление класса Api

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-65/',
  headers: {
    authorization: 'bbcfaa98-6a77-40f9-8ffe-975506acb190',
    'Content-Type': 'application/json'
  }
});

// Получение и отрисовка данных юзера из `${this._url}users/me
api
  .getProfileInfo()
  .then(profileData => {
    userProfileInfo.setUserInfo({ username: profileData.name, userinfo: profileData.about });
  })
  .catch(err => {
    console.warn(`Возникла ошибка в профиле:${err}`);
  });
// Получение и отрисовка данных карточек из `${this._url}cards
api
  .getCardsFromServer()
  .then(cardData => {
    cardList.renderItems(cardData);
  })
  .catch(error => {
    console.warn(`Возникла ошибка в галерее картинок: ${error}`);
  });

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

//Добавление готовых карточек c сервера в document через класс Section
const cardList = new Section(
  {
    renderer: cardItem => {
      const card = new Card(cardItem, '#element-template', handleCardClick);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  },
  cardSection
);
//Вызов рендера карточек
//cardList.renderItems();

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
  const profileInfo = userProfileInfo.getUserInfo();
  userNameInput.value = profileInfo.username;
  userPositionInput.value = profileInfo.userinfo;
  editProfileFormPopup.resetValidation();
  popupEditProfile.open();
});

//3.Попап добавления карточки PopupWithForm
const popupAddCard = new PopupWithForm('#add-popup', {
  callbackSubmit: cardData => {
    const newCard = {
      name: cardData.picname,
      link: cardData.url
    };
    cardList.addItem(createCardElement(newCard));
    popupAddCard.close();
  }
});
//Cлушатели на попап карточки
popupAddCard.setEventListeners();
//Слушатели на иконку добавления карточки
profileButtonAdd.addEventListener('click', () => {
  addCardFormPopup.resetValidation();
  popupAddCard.open();
});
