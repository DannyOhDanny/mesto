// Класс Card, создающий карточки по конструктору из массива.
export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._title = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  //Создаем шаблон карточки
  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardElement;
  };

  generateCard = () => {
    //Шаблон
    this._element = this._getTemplate();
    //Объявление переменных
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__pic');
    this._likeButton = this._element.querySelector('.element__heart');
    this._deleteButton = this._element.querySelector('.element__delete-btn');
    this._popupElement = document.querySelector('#image-popup');
    this._popupImage = document.querySelector('.popup__pic');
    this._popupTitle = document.querySelector('.popup__title');

    //Вызов  this._setEventListeners(); должен быть после объявления классовой переменной, чтобы в нём она была доступна.
    this._setEventListeners();

    // Присвоение значений карточке
    this._cardTitle.textContent = this._title;
    this._cardImage.alt = `${this._title}`;
    this._cardImage.src = `${this._link}`;

    // Возврат карточки
    return this._element;
  };
  // Удалить карточки
  _removeCard = () => {
    this._element.remove();
    this._element = null;
  };
  // Лайкнуть карточку
  _isLiked = () => {
    this._likeButton.classList.toggle('element__heart_active');
  };

  //Слушатели на клик по изображению, корзине, лайку:
  _setEventListeners() {
    //Слушател на картинку
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });
    //Слушател на кнопку удаления
    this._deleteButton.addEventListener('click', () => {
      this._removeCard();
    });
    // Слушатель на кнопку лайка
    this._likeButton.addEventListener('click', () => {
      this._isLiked();
    });
  }
}
