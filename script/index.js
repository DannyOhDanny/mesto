const popup = document.querySelector('.popup');
const elementsContainer = document.querySelector('.elements');
const editPopup = document.querySelector('#edit-popup');
const editFormElement = document.querySelector('#edit-form');
const addPopup = document.querySelector('#add-popup');
const addFormElement = document.querySelector('#add-form');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const popupButtonClose = document.querySelector('.popup__button-close_type_edit');
const addPopupButtonClose = document.querySelector('.popup__button-close_type_add');
const profileButtonAdd = document.querySelector('.profile__button-add_action_add');
let nameHTML = document.querySelector('.profile__name');
let positionHTML = document.querySelector('.profile__position');
let userNameInput = document.querySelector('.popup__input-name_type_name');
let userPositionInput = document.querySelector('.popup__input-name_type_position');
const modalPopup = document.querySelector('#image-popup');
const imageHTML = document.querySelector('.element__pic');
const modalCaption = document.querySelector('.popup__title');
const modalImg = document.querySelector('.popup__pic');
const closeModalPopup = document.querySelector('.popup__button-close_type_image-popup');

profileButtonEdit.addEventListener('click', openEditPopup);
popupButtonClose.addEventListener('click', closePopup);
editFormElement.addEventListener('submit', handleFormSubmit);
addFormElement.addEventListener('submit', handleFormAddImage);
addPopupButtonClose.addEventListener('click', closeAddPopup);
profileButtonAdd.addEventListener('click', function () {
  openAddPopup();
});

function closePopup() {
  popup.classList.add('popup_hidden');
}

function closeAddPopup() {
  addPopup.classList.add('popup_hidden');
}

function openEditPopup() {
  editPopup.classList.remove('popup_hidden');
  userNameInput.value = nameHTML.textContent;
  userPositionInput.value = positionHTML.textContent;
  closeAddPopup();
}

function openAddPopup() {
  addPopup.classList.remove('popup_hidden');
}

function closeImgPopup() {
  modalPopup.classList.add('popup_hidden');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameHTML.textContent = userNameInput.value;
  positionHTML.textContent = userPositionInput.value;
  closePopup();
}

// Исходный массив + 3 свои карточки

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
// код, добавляющий карточки из массива на страницу

function createCard(element) {
  const elementTemplate = document.querySelector('#element-template').content.cloneNode(true);

  const elementHeading = elementTemplate.querySelector('.element__title');
  elementHeading.textContent = element.name;
  const elementPicture = elementTemplate.querySelector('.element__pic');
  elementPicture.setAttribute('src', element.link);
  elementPicture.setAttribute('alt', element.name);

  const likeElement = elementTemplate.querySelector('.element__heart');
  likeElement.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart_active');
  });

  elementsContainer.append(elementTemplate);

  elementPicture.addEventListener('click', handleImgPopup);
}

initialCards.forEach(createCard);

//код, удаляющий карточки из массива

const deleteBtn = document.querySelectorAll('.element__delete-btn');

deleteBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    const deletedElement = btn.closest('.element');
    deletedElement.parentNode.removeChild(deletedElement);
  });
});

// Добавление новых карточек

function addImageCard(nameValue, urlValue) {
  const cardTemplate = document.querySelector('#element-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardElementTitle = cardElement.querySelector('.element__title');
  const cardElementUrl = cardElement.querySelector('.element__pic');

  cardElementTitle.textContent = nameValue;
  cardElementUrl.textContent = urlValue;

  cardElementUrl.setAttribute('src', urlValue);
  cardElementUrl.setAttribute('alt', nameValue);

  cardElement.querySelector('.element__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart_active');
  });

  elementsContainer.prepend(cardElement);

  cardElement.querySelector('.element__delete-btn').addEventListener('click', function (evt) {
    const deletedElement = cardElement.closest('.element');
    deletedElement.parentNode.removeChild(deletedElement);
  });

  cardElementUrl.addEventListener('click', handleImgPopup);
}

//Передача инфо из импута в карточку

function handleFormAddImage(evt) {
  evt.preventDefault();
  const name = document.querySelector('.popup__input-name_type_heading');
  const link = document.querySelector('.popup__input-name_type_url');

  addImageCard(name.value, link.value);

  closeAddPopup();

  evt.target.reset();
}

//Ф-ия попапа изображения
closeModalPopup.addEventListener('click', closeImgPopup);
imageHTML.addEventListener('click', handleImgPopup);

//Присовение значений попапу

function handleImgPopup() {
  modalPopup.classList.remove('popup_hidden');
  modalImg.src = this.src;
  modalImg.alt = this.alt;
  modalCaption.innerHTML = this.alt;
}
