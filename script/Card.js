// Исходный массив
class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._templateSelector = templateSelector;
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

  _closeByEscape() {}

  _createOpenPopup() {
    document.querySelector('.popup__pic').src = this._link;
    document.querySelector('.popup__pic').alt = `${this._title}`;
    document.querySelector('.popup__title').textContent = `${this._title}`;
    document.querySelector('#image-popup').classList.add('popup_opened');
  }

  _closePopup() {
    document.querySelector('.popup__pic').src = '';
    document.querySelector('.popup__title').textContent = '';
    document.querySelector('#image-popup').classList.remove('popup_opened');
  }

  _setEventListeners() {
    this._element.querySelector('.element__pic').addEventListener('click', () => {
      this._createOpenPopup();
    });

    document
      .querySelector('#image-popup')
      .querySelector('.popup__button-close')
      .addEventListener('click', () => {
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

export { Card };
