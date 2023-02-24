const popup = document.querySelector('#edit-form');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const popupButtonClose = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__form');
const pageMain = document.querySelector('.elements');
let nameHTML = document.querySelector('.profile__name');
let positionHTML = document.querySelector('.profile__position');
let userNameInput = document.querySelector('.popup__input-name_type_name');
let userPositionInput = document.querySelector('.popup__input-name_type_position');

let pictureHeadingInput = document.querySelector('.popup__input-name_type_heading');
let pictureUrlInput = document.querySelector('.popup__input-name_type_url');

profileButtonEdit.addEventListener('click', openPopup);
popupButtonClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

function closePopup() {
  popup.classList.add('popup_hidden');
}

function openPopup() {
  popup.classList.remove('popup_hidden');
  userNameInput.value = nameHTML.textContent;
  userPositionInput.value = positionHTML.textContent;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameHTML.textContent = userNameInput.value;
  positionHTML.textContent = userPositionInput.value;
  closePopup();
}

const profileButtonAdd = document.querySelector('.profile__button-add_action_add');
const popupAdd = document.querySelector('#add-form');
profileButtonAdd.addEventListener('click', openPopupAdd);

function openPopupAdd() {
  popupAdd.classList.remove('popup_hidden');
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

initialCards.forEach(function (element) {
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

  pageMain.append(elementTemplate);
});

//код удаляющий карточки из массива
const deleteBtn = document.querySelectorAll('.element__delete-btn');

deleteBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    const deletedElement = btn.closest('.element');
    deletedElement.parentNode.removeChild(deletedElement);
  });
});
