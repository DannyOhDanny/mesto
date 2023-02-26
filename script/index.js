const popup = document.querySelector('.popup');
const editPopup = document.querySelector('#edit-popup');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const editFormElement = document.querySelector('#edit-form');
const popupButtonClose = document.querySelector('.popup__button-close');
const elementsContainer = document.querySelector('.elements');
const profileButtonAdd = document.querySelector('.profile__button-add_action_add');
const addPopup = document.querySelector('#add-popup');
let nameHTML = document.querySelector('.profile__name');
let positionHTML = document.querySelector('.profile__position');
let userNameInput = document.querySelector('.popup__input-name_type_name');
let userPositionInput = document.querySelector('.popup__input-name_type_position');

profileButtonEdit.addEventListener('click', openEditPopup);
popupButtonClose.addEventListener('click', closePopup);
editFormElement.addEventListener('submit', handleFormSubmit);

function closePopup() {
  popup.classList.add('popup_hidden');
}

function openEditPopup() {
  editPopup.classList.remove('popup_hidden');
  userNameInput.value = nameHTML.textContent;
  userPositionInput.value = positionHTML.textContent;
}

function openPopupAdd() {
  addPopup.classList.remove('popup_hidden');
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
    link: '../images/element_pic-4.jpg'
  },
  {
    name: 'Куршская коса',
    link: '../images/element_pic-6.jpg'
  },
  {
    name: 'Выборг',
    link: '../images/element_pic-5.jpg'
  }
];
// код, добавляющий карточки из массива на страницу

function createCard(element) {
  const elementTemplate = document.querySelector('#element-template').content.cloneNode(true);
  const elementHeading = elementTemplate.querySelector('.element__title');
  elementHeading.textContent = element.name;
  const elementPicture = elementTemplate.querySelector('.element__pic');
  elementPicture.setAttribute('src', element.link);
  elementPicture.setAttribute('alt', 'Фото');

  const likeElement = elementTemplate.querySelector('.element__heart');
  likeElement.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart_active');
  });

  elementsContainer.append(elementTemplate);
}

initialCards.forEach(createCard);

//код удаляющий карточки из массива
const deleteBtn = document.querySelectorAll('.element__delete-btn');

deleteBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    const deletedElement = btn.closest('.element');
    deletedElement.parentNode.removeChild(deletedElement);
  });
});

profileButtonAdd.addEventListener('click', function () {
  openPopupAdd();

  const name = document.querySelector('.popup__input-name_type_heading');
  const link = document.querySelector('.popup__input-name_type_url');

  addImageCard(name.value, link.value);
});

//ф-ия создает шаблон. Но новые данные в форму не уходят.

function addImageCard(nameValue, urlValue) {
  const CardTemplate = document.querySelector('#element-template').content;
  const CardElement = CardTemplate.querySelector('.element').cloneNode(true);

  CardElement.querySelector('.element__title').textContent = nameValue;
  CardElement.querySelector('.element__pic').textContent = urlValue;
  CardElement.setAttribute('src', urlValue);
  CardElement.setAttribute('alt', 'Фото');
  CardElement.querySelector('.element__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart_active');
  });

  elementsContainer.prepend(CardElement);
}
