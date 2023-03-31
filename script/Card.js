// Исходный массив
const dataList = [
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

const imagePopup = document.querySelector('#image-popup');
const modalCaption = document.querySelector('.popup__title');
const modalImg = document.querySelector('.popup__pic');
//const popupButtonClose = document.querySelector('.popup__button-close');

class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._templateSelector = templateSelector;
    //this._isLiked = false;
    //this._isDeleted = false;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__pic').src = `${this._link}`;
    this._element.querySelector('.element__pic').alt = `${this._title}`;

    return this._element;
  }

  _removeCard() {
    this._element.remove();
  }

  _isLiked() {
    this._element.querySelector('.element__heart').classList.toggle('element__heart_active');
  }

  _createOpenPopup() {
    modalImg.src = this._link;
    modalImg.alt = `${this._title}`;
    modalCaption.textContent = `${this._title}`;
    imagePopup.classList.add('popup_opened');
  }

  _closePopup() {
    modalImg.src = '';
    modalCaption.textContent = '';
    imagePopup.classList.remove('popup_opened');
  }

  _setEventListeners() {
    this._element.querySelector('.element__pic').addEventListener('click', () => {
      this._createOpenPopup();
    });

    imagePopup.querySelector('.popup__button-close').addEventListener('click', () => {
      this._closePopup();
    });

    this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
      this._removeCard();
    });

    this._element.querySelector('.element__heart').addEventListener('click', () => {
      this._isLiked();
    });
  }
}

dataList.forEach(item => {
  const card = new Card(item, '#element-template');
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
});

export { Card };
