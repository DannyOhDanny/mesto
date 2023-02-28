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
const userNameInput = document.querySelector('.popup__input-name_type_name');
const userPositionInput = document.querySelector('.popup__input-name_type_position');
const titleInput = document.querySelector('.popup__input-name_type_heading');
const urlInput = document.querySelector('.popup__input-name_type_url');
const imagePopup = document.querySelector('#image-popup');
const imageHTML = document.querySelector('.element__pic');
const modalCaption = document.querySelector('.popup__title');
const modalImg = document.querySelector('.popup__pic');

//Слушатели

editProfileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardForm);

editProfileForm.addEventListener('submit', function () {
  closePopup(editProfilePopup);
});

addCardForm.addEventListener('submit', function () {
  closePopup(addCardPopup);
});

profileButtonEdit.addEventListener('click', function () {
  openPopup(editProfilePopup);
});
profileButtonAdd.addEventListener('click', function () {
  openPopup(addCardPopup);
});

//Код, собирающий карточку

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
  cardPicture.setAttribute('alt', `Фото: ${item.name}`);

  return cardItem;
}

//Код, добавляющий карточки

function createCard(element) {
  const elementTemplate = getCard(element);
  elementsContainer.append(elementTemplate);
}

//мВызов функции, создающей карточки из массива
initialCards.forEach(createCard);

// Добавление новых карточек

function addImageCard(nameValue, urlValue) {
  const newcardTemplate = document.querySelector('#element-template').content;
  const newcardElement = newcardTemplate.querySelector('.element').cloneNode(true);
  const cardElementTitle = newcardElement.querySelector('.element__title');
  const cardElementImg = newcardElement.querySelector('.element__pic');
  const deleteButton = newcardElement.querySelector('.element__delete-btn');

  newcardElement.querySelector('.element__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart_active');
  });

  deleteButton.addEventListener('click', function (evt) {
    newcardElement.remove();
  });

  cardElementImg.addEventListener('click', handleImgPopup);

  cardElementTitle.textContent = nameValue;
  cardElementImg.textContent = urlValue;
  cardElementImg.setAttribute('src', urlValue);
  cardElementImg.setAttribute('alt', nameValue);

  elementsContainer.prepend(newcardElement);
}

//Функция редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameHTML.textContent = userNameInput.value;
  positionHTML.textContent = userPositionInput.value;
}

//Передача инфо из импута в карточку добавления изображения

function handleAddCardForm(evt) {
  evt.preventDefault();
  const name = titleInput;
  const link = urlInput;

  addImageCard(name.value, link.value);

  evt.target.reset();
}

//Присовение значений попапу изображения

function handleImgPopup(evt) {
  imagePopup.classList.add('popup_opened');
  modalImg.src = evt.target.src;
  modalImg.alt = evt.target.alt;
  modalCaption.innerHTML = evt.target.alt;
}

// универсальные ф-ии закрытия/открытия
const closeButtons = document.querySelectorAll('.popup__button-close');

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
