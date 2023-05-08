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

//Импорт классов
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
    // Получение и отрисовка данных профиля пользователя из `${this._url}users/me
    userProfileInfo.setUserInfo({ username: profileData.name, userinfo: profileData.about });
    // Получение и отрисовка аватара пользователя из `${this._url}users/me
    userProfileInfo.setAvatarPic(profileData.avatar);
    // Получение user-ID пользователя из JSON для дальнейшего сравнений с owner-ID владельца карточки.
    userId = profileData._id;
    // Получение и отрисовка данных карточек из `${this._url}cards + методы reverse + append ставят карточку в массиве на 1-ое место
    cardList.renderItems(cardData.reverse());
  })
  .catch(err =>
    console.error(`Возникла ошибка загрузки данных с сервера:${err} - ${err.statusText}`)
  );

// Переменная для ID пользователя
let userId;

//Добавление новых карточек в document через класс Card
function createCardElement(item) {
  const card = new Card(
    item,
    '#element-template',
    //Колбек увеличения фото
    {
      handleCardClick: () => {
        popupOpenImage.open(item.title, item.link);
      }
    },
    userId,
    {
      //Колбек удаления карточки
      handleCardDelete: () => {
        //Открываем попап подтверждения удаления карточки и навешиваем слушатели
        PopupConfirmDelete.open();
        //Передаем попапу колбек удаления по нажатию на кнопку Submit
        PopupConfirmDelete.handleSubmit(() => {
          //Вызываем ф-ию удаления карточки с сервера через класс API
          api
            .deleteUserCard(item._id)
            .then(() => {
              //Выполняем удаление карточки из DOM
              card.removeCard();
              //Закрываем попап и удаляем слушатели
              PopupConfirmDelete.close();
            })
            //Ловим ошибки
            .catch(err => {
              console.error(`Ошибка при удалении карточки: ${err.status} - ${err.statusText}`);
            });
        });
      }
    },
    {
      //Колбек постановки лайка карточке
      handleCardLikes: () => {
        //Проверяем, есть ли user._id в массиве лайков
        //Если есть, то вызываем удаление лайка из массива лайков на сервере через класс API + передаем ._id
        if (card.hasMyLike()) {
          api
            .deleteUserLike(item._id)
            .then(item => {
              //Убираем отметку лайка с иконки в DOM
              card.isNotLiked();
              //Показываем кол-во лайков в DOM + передаем значение .likes
              card.showCardLikes(item.likes);
              //console.log(item.likes);
            })
            //Ловим ошибки
            .catch(error => {
              console.error(`Ошибка при удалении лайка: ${error.status} - ${error.statusText}`);
            });
        } else {
          //Если нет, то вызываем добавление лайка в массив лайков на сервере через класс API
          api
            .putUserLike(item._id)
            .then(item => {
              card.isLiked();
              card.showCardLikes(item.likes);
              //console.log(item.likes);
            })
            .catch(error => {
              console.error(`Ошибка при постановке лайка: ${error.status} - ${error.statusText}`);
            });
        }
      }
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

//Добавление готовых карточек из массива на сервере в document через класс Section
const cardList = new Section(
  {
    renderer: cardItem => {
      cardList.addItem(createCardElement(cardItem));
    }
  },
  cardSection
);

//Вызов класса FormValidator для попапов с формой и активация валидации импутов к ним
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
// Вызываем класс popupEditProfile с селекторами и колбэком - подстановка новых значений импутов в объект на сервере
const popupEditProfile = new PopupWithForm('#edit-popup', {
  callbackSubmit: profileData => {
    // Передаем значение true для начала вызова Сохранения...
    popupEditProfile.renderLoading(true);
    // Вызываем ф-ию изменения информации в профиле пользователя на сервере через класс API
    api
      .editProfileInfo(profileData)
      .then(res => {
        const newUserData = { username: res.name, userinfo: res.about };
        //console.log(res);
        userProfileInfo.setUserInfo(newUserData);
        popupEditProfile.close();
      })
      .catch(err => {
        console.warn(`Ошибка загрузки данных профиля : ${err.status} - ${err.statusText}`);
      })
      // Передаем значение false для прекращения Сохранения...
      .finally(() => popupEditProfile.renderLoading(false));
  }
});

//Cлушатели на попап редактирования профиля пользователя
popupEditProfile.setEventListeners();

//3.Попап редактирования аватара
//Вызываем popupEditAvatar
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

//Cлушатели на попап редактирования аватара
popupEditAvatar.setEventListeners();

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
        //console.log(newCard);
      })
      .catch(err => {
        console.warn(`Ошибка загрузки карточки: ${err} - ${err.statusText}`);
      })
      .finally(() => popupAddCard.renderLoading(false));
  }
});

//Cлушатели на попап добавления карточки
popupAddCard.setEventListeners();

//Слушатели на иконку добавления карточки на странице
profileButtonAdd.addEventListener('click', () => {
  addCardFormPopup.resetValidation();
  popupAddCard.open();
});

//Слушатели на иконку редактирования профиля и установка значений по умолчанию в поля формы
profileButtonEdit.addEventListener('click', () => {
  const profileInfo = userProfileInfo.getUserInfo();
  userNameInput.value = profileInfo.username;
  userPositionInput.value = profileInfo.userinfo;
  editProfileFormPopup.resetValidation();
  popupEditProfile.open();
});

//Cлушатели на кнопку добавления аватара на странице
avatarButtonEdit.addEventListener('click', () => {
  editAvatarFormPopup.resetValidation();
  popupEditAvatar.open();
});

//5.Попап подтверждения удаления карточки
//Объявление класса PopupConfirmDelete с подтверждением удаления
const PopupConfirmDelete = new PopupWithConfirmation('#delete-popup', {
  callbackSubmit: cardId => {
    //Колбек удаления карточки - через вызов удаления по классу API + значение.
    api
      .deleteMyCard(cardId)
      .then(() => {
        //Закрытие попапа подтверждения удаления
        PopupConfirmDelete.close();
      })
      .catch(err => {
        console.warn(`Ошибка подтверждения удаления карточки: ${err.status} - ${err.statusText}`);
      });
  }
});

PopupConfirmDelete.setEventListeners();
