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
    // Получение и отрисовка данных юзера из `${this._url}users/me
    userProfileInfo.setUserInfo({ username: profileData.name, userinfo: profileData.about });
    // Получение и отрисовка аватара юзера из `${this._url}users/me
    userProfileInfo.setAvatarPic(profileData.avatar);
    // Получение собственного user-ID из JSON для дальнейшего сравнений с owner- ID владельца карточки.
    userId = profileData._id;
    // Получение и отрисовка данных карточек из `${this._url}cards + метод reverse ставитт карточку в массиве на 1ое место
    cardList.renderItems(cardData.reverse());
  })
  .catch(err =>
    console.error(`Возникла ошибка загрузки данных с сервера:${err} - ${err.statusText}`)
  );

// Переменная для ID пользователя
let userId;

//Добавление новых карточек в document через Класс Card
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
        //Открываем попап подтверждения удаления и навешиваем слушаетли
        PopupConfirmDelete.open();
        //Передаем попапу колбек удаления по нажатию на сабмит
        PopupConfirmDelete.handleSubmit(() => {
          //Вызываем ф-ию удаления карточки с сервера через класс API
          api
            .deleteMyCard(item._id)
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
        //Проверяем, есть ли user._id ав массиве лайков
        //Если есть, то вызываем удаления лайка из массива  сервера через класс API
        if (card.hasMyLike()) {
          api
            .deleteMyLike(item._id)
            .then(item => {
              //Убираем отметку лайка с иконки в DOM
              card.isNotLiked();
              //Показываем кол-во лайков в DOM
              card.showCardLikes(item.likes);
              //console.log(item.likes);
            })
            //Ловим ошибки
            .catch(error => {
              console.error(`Ошибка при удалении лайка: ${error.status} - ${error.statusText}`);
            });
        } else {
          //Если нет, то вызываем добавление лайка в массив на сервер через класс API
          api
            .putMyLike(item._id)
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

//Добавление готовых карточек c сервера в document через класс Section
const cardList = new Section(
  {
    renderer: cardItem => {
      cardList.addItem(createCardElement(cardItem));
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
    popupEditProfile.renderLoading(true);
    api
      .editProfileInfo(profileData)
      .then(res => {
        console.log(res);
        userProfileInfo.setUserInfo({ username: res.name, userinfo: res.about });
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

//Слушатели на иконку редактирования профиля и вставка дефолтного значения в поля формы
profileButtonEdit.addEventListener('click', () => {
  const profileInfo = userProfileInfo.getUserInfo();
  userNameInput.value = profileInfo.username;
  userPositionInput.value = profileInfo.userinfo;
  editProfileFormPopup.resetValidation();
  popupEditProfile.open();
});

//Cлушатели на кнопку добавления аватара
avatarButtonEdit.addEventListener('click', () => {
  editAvatarFormPopup.resetValidation();
  popupEditAvatar.open();
});

//5.Попап подтверждения удаления карточки
const PopupConfirmDelete = new PopupWithConfirmation('#delete-popup', {
  callbackSubmit: cardId => {
    //Колбек удаления карточки - через вызов удаления по классу API
    api
      .deleteMyCard(cardId)
      .then(() => {
        //закрытие попапа подтверждения удаления
        PopupConfirmDelete.close();
      })
      .catch(err => {
        console.warn(`Ошибка подтверждения удаления карточки: ${err.status} - ${err.statusText}`);
      });
  }
});

PopupConfirmDelete.setEventListeners();
