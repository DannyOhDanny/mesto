// Импорт картинок
const solnechnogorsk = new URL('../images/element_pic-4.jpg', import.meta.url);
const kurshskayaKosa = new URL('../images/element_pic-5.jpg', import.meta.url);
const vyborg = new URL('../images/element_pic-6.jpg', import.meta.url);

//Исходный массив
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
    link: solnechnogorsk
  },
  {
    name: 'Куршская коса',
    link: kurshskayaKosa
  },
  {
    name: 'Выборг',
    link: vyborg
  }
];

//Объект - конфигуратор со свойствами селекторов и классов
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Константы
const elementsContainer = document.querySelector('.elements');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonAdd = document.querySelector('.profile__button-add');
const userNameInput = document.querySelector('.popup__input_type_name');
const userPositionInput = document.querySelector('.popup__input_type_position');
const titleInput = document.querySelector('.popup__input_type_heading');
const urlInput = document.querySelector('.popup__input_type_url');
const cardSection = '.elements';
const avatarEditBtn = document.querySelector('.profile__column-avatar-btn');

export {
  initialCards,
  settings,
  elementsContainer,
  profileButtonAdd,
  profileButtonEdit,
  userNameInput,
  userPositionInput,
  titleInput,
  urlInput,
  cardSection,
  avatarEditBtn
};
