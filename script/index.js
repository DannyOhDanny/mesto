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
const closeButtons = document.querySelectorAll('.popup__button-close');
const popupWindows = document.querySelectorAll('.popup');

//Слушатели

addCardForm.addEventListener('submit', handleAddCardForm);

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

profileButtonEdit.addEventListener('click', function () {
  userPositionInput.value = positionHTML.textContent;
  userNameInput.value = nameHTML.textContent;
  openPopup(editProfilePopup);
});

profileButtonAdd.addEventListener('click', function () {
  openPopup(addCardPopup);
});

//Функция редактирования профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameHTML.textContent = userNameInput.value;
  positionHTML.textContent = userPositionInput.value;
  closePopup(editProfilePopup);
}

//Код, собирающий карточку:
function getCard(item) {
  const itemTemplate = document.querySelector('#element-template').content;
  const cardItem = itemTemplate.querySelector('.element').cloneNode(true);
  const cardPicture = cardItem.querySelector('.element__pic');
  const deleteButton = cardItem.querySelector('.element__delete-btn');
  const likeButton = cardItem.querySelector('.element__heart');
  const cardHeading = cardItem.querySelector('.element__title');

  cardPicture.addEventListener('click', handleImgPopup);

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
}

//Код, добавляющий карточки
function createCard(element) {
  const elementTemplate = getCard(element);
  elementsContainer.prepend(elementTemplate);
}

//Вызов функции, создающей карточки из массива
initialCards.forEach(createCard);

//Передача инфо из импута в карточку добавления изображения
function handleAddCardForm(evt) {
  evt.preventDefault();
  const element = {
    name: titleInput.value,
    link: urlInput.value
  };
  createCard(element);
  evt.target.reset();
  closePopup(addCardPopup);
}

//Присовение значений попапу изображения
function handleImgPopup(evt) {
  openPopup(imagePopup);
  modalImg.src = evt.target.src;
  modalImg.alt = evt.target.alt;
  modalCaption.textContent = evt.target.alt;
}

// Универсальные ф-ии закрытия/открытия
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Закрытие каждого попапа по нажатию на фон попапа.

popupWindows.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

//Закрытие каждого попапа по нажатию на Esc.

popupWindows.forEach(popup => {
  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
});
