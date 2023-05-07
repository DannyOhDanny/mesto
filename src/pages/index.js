// Импорт стилей CSS
import './index.css';

//Импорт констант
import {
  settings,
  profileButtonAdd,
  profileButtonEdit,
  avatarButtonEdit,
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
import PopupWithConfirmation from '../script/PopupWithConfirmation.js';
import UserInfo from '../script/UserInfo.js';
import { api } from '../script/Api.js';

Promise.all([api.getProfileInfoFromServer(), api.getCardsFromServer()])
  .then(([profileData, cardData]) => {
    userProfileInfo.setUserInfo({ username: profileData.name, userinfo: profileData.about });
    userProfileInfo.setAvatarPic(profileData.avatar);
    userId = profileData._id;
    cardList.renderItems(cardData);
  })
  .catch(err =>
    console.error(`Возникла ошибка загрузки данных с сервера:${err} - ${err.statusText}`)
  );

/*/ Получение и отрисовка данных юзера из `${this._url}users/me
api
  .getProfileInfoFromServer()
  .then(profileData => {
    userProfileInfo.setUserInfo({ username: profileData.name, userinfo: profileData.about });
    //console.log(profileData);
  })
  .catch(err => {
    console.warn(`Возникла ошибка в профиле:${error} - ${err.statusText}`);
  });

// Получение и отрисовка аватара юзера из `${this._url}users/me
api
  .getProfileInfoFromServer()
  .then(profileData => {
    userProfileInfo.setAvatarPic(profileData.avatar);
    //console.log(profileData);
  })
  .catch(err => {
    console.warn(`Возникла ошибка в профиле:${error} - ${err.statusText}`);
  });

// Вынимаем собственный ID из JSON для дальнейшего сравнений с ID владельца карточки.

api
  .getProfileInfoFromServer()
  .then(profileData => {
    userId = profileData._id;
  })
  .catch(err => {
    console.warn(`Возникла ошибка в ID:${error} - ${err.statusText}`);
  });

// Получение и отрисовка данных карточек из `${this._url}cards
api
  .getCardsFromServer()
  .then(cardData => {
    console.log(cardData);
    cardList.renderItems(cardData);
  })
  .catch(error => {
    console.warn(`Возникла ошибка в галерее картинок: ${error} - ${err.statusText}`);
  });*/

// Переменная для ID пользователя
let userId;

//Функция вызова готового попапа по клику на изображение
function handleCardClick(title, link) {
  popupOpenImage.open(title, link);
}
//функция удаления карточки
async function handleCardDelete(cardElement) {
  try {
    await api.deleteMyCard(cardElement.getId());
    cardElement.removeCard();
  } catch (error) {
    console.error(`Ошибка при удалении карточки: ${error} - ${error.statusText}`);
  }
}

async function handlePutCardLike(cardId) {
  try {
    await api.putMyLike(cardId);
  } catch (error) {
    console.error(`Ошибка при постановке лайка: ${error} - ${error.statusText}`);
  }
}

async function handleDeleteCardLike(cardId) {
  try {
    await api.deleteMyLike(cardId);
  } catch (error) {
    console.error(`Ошибка при удалении лайка: ${error} - ${error.statusText}`);
  }
}

//Добавление новых карточек в document через Класс Card
function createCardElement(item) {
  const card = new Card(
    item,
    '#element-template',
    handleCardClick,
    userId,
    handleCardDelete,
    handlePutCardLike,
    handleDeleteCardLike
  );
  const cardElement = card.generateCard();
  return cardElement;
}

//Добавление готовых карточек c сервера в document через класс Section
const cardList = new Section(
  {
    renderer: cardItem => {
      const card = new Card(
        cardItem,
        '#element-template',
        handleCardClick,
        userId,
        handleCardDelete,
        handlePutCardLike,
        handleDeleteCardLike
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  },
  cardSection
);

//Вызов класса FormValidator для попапов и активация валидации импутов к ним
const addCardFormPopup = new FormValidator(settings, document.forms['card-form']);
addCardFormPopup.enableValidation();

const editProfileFormPopup = new FormValidator(settings, document.forms['profile-form']);
editProfileFormPopup.enableValidation();

const editAvatarFormPopup = new FormValidator(settings, document.forms['avatar-form']);
editAvatarFormPopup.enableValidation();

//Вызов класса UserInfo с селекторами
const userProfileInfo = new UserInfo({
  usernameSelector: '.profile__name',
  userinfoSelector: '.profile__position',
  avatarSelector: '.profile__column-pic'
});

//1. Попап изображения PopupWithImage
//Объявление класса PopupOpenImage с открывающимся изображением
const popupOpenImage = new PopupWithImage('#image-popup');
popupOpenImage.setEventListeners();

//2. Попап редактирования инфо профиля PopupWithForm
//Вызываем класс PopupWithForm с селекторами и колбэком - подстановка новых значений импутов в объект на сервере
const popupEditProfile = new PopupWithForm('#edit-popup', {
  callbackSubmit: profileData => {
    popupEditProfile.renderLoading(true),
      api
        .editProfileInfo(profileData)
        .then(res => {
          console.log(res);
          const newInfo = { name: res.name, position: res.about };
          userProfileInfo.setUserInfo(newInfo);
          popupEditProfile.close();
        })
        .catch(err => {
          console.warn(`Ошибка загрузки данных профиля : ${err} - ${err.statusText}`);
        })
        .finally(() => popupEditProfile.renderLoading(false));
  }
});

//Cлушатели на попап
popupEditProfile.setEventListeners();

//3.Попап редактирования аватара
const popupEditAvatar = new PopupWithForm('#avatar-popup', {
  callbackSubmit: profileData => {
    popupEditAvatar.renderLoading(true);
    api
      .editAvatarPic(profileData)
      .then(res => {
        console.log(res);
        userProfileInfo.setAvatarPic(res.avatar);
        popupEditAvatar.close();
      })
      .catch(err => {
        console.warn(`Ошибка загрузки автара: ${err} - ${err.statusText}`);
      })
      .finally(() => popupEditAvatar.renderLoading(false));
  }
});

//Cлушатели на попап
popupEditAvatar.setEventListeners();

//Cлушатели на кнопку
avatarButtonEdit.addEventListener('click', () => {
  editAvatarFormPopup.resetValidation();
  popupEditAvatar.open();
});

//Слушатели на иконку редактирования профиля и вставка дефолтного значения в поля формы
profileButtonEdit.addEventListener('click', () => {
  const profileInfo = userProfileInfo.getUserInfo();
  userNameInput.value = profileInfo.username;
  userPositionInput.value = profileInfo.userinfo;
  editProfileFormPopup.resetValidation();
  popupEditProfile.open();
});

//4.Попап добавления новой карточки PopupWithForm
const popupAddCard = new PopupWithForm('#add-popup', {
  callbackSubmit: cardData => {
    const newCardData = { name: cardData.picname, link: cardData.url };
    popupAddCard.renderLoading(true);
    api
      .setNewCard(newCardData)
      .then(newCard => {
        cardList.addItem(createCardElement(newCard));
        popupAddCard.close();
        console.log(newCard);
      })
      .catch(err => {
        console.warn(`Ошибка загрузки карточки: ${err} - ${err.statusText}`);
      })
      .finally(() => popupAddCard.renderLoading(false));
  }
});

//Cлушатели на попап карточки
popupAddCard.setEventListeners();

//Слушатели на иконку добавления карточки
profileButtonAdd.addEventListener('click', () => {
  addCardFormPopup.resetValidation();
  popupAddCard.open();
});
