// Класс Card, создающий карточки по конструктору из массива.
export default class Card {
  constructor(cardData, templateSelector, handleCardClick, userId, handleCardDelete) {
    this._cardItem = cardData;
    this._title = this._cardItem.name;
    this._link = this._cardItem.link;
    this._alt = this._cardItem.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;

    this._ownerId = this._cardItem.owner._id;
    this._userId = userId;
    this._cardId = this._cardItem._id;
  }
  // Создаем шаблон карточки
  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardElement;
  };

  getId() {
    return this._cardId;
  }

  generateCard = () => {
    // Шаблон
    this._element = this._getTemplate();
    // Объявление переменных
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__pic');
    this._likeButton = this._element.querySelector('.element__heart');
    this._deleteButton = this._element.querySelector('.element__delete-btn');
    this._likeElement = this._element.querySelector('.element__counter');

    // Вызов  this._setEventListeners(); должен быть после объявления классовой переменной, чтобы в нём она была доступна.
    this._setEventListeners();

    // Присвоение значений карточке
    this._cardTitle.textContent = this._title;
    this._cardImage.alt = this._title;
    this._cardImage.src = this._link;
    this._element.dataset.cardId = this._cardId;
    // Отображение лайков
    this.showLikes(this._cardItem);

    //Сравниваем свой ID c ID автора карточки
    if (this._ownerId !== this._userId) {
      this._deleteButton.classList.add('element__delete-btn_type_hidden');
    }

    console.log(`owner ID: ${this._ownerId}`);
    console.log(`my ID: ${this._userId}`);
    console.log(`card ID: ${this._cardId}`);

    // Возврат карточки
    return this._element;
  };

  // Удалить карточки
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  // Лайкнуть карточку
  _isLiked() {
    this._likeButton.classList.toggle('element__heart_active');
  }

  // Загрузка кол-ва лайков с сервера - находим св-во объекта и длинну массива
  showLikes = cardElement => {
    this.likesCounter = cardElement.likes;
    this.likesNumber = this.likesCounter.length;
    this._likeElement.textContent = this.likesNumber;
  };

  //Слушатели на клик по изображению, корзине, лайку:
  _setEventListeners() {
    //Слушатель на картинку
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });
    //Слушатель на кнопку удаления
    this._deleteButton.addEventListener('click', () => {
      this._handleCardDelete(this);
      //this._element.removeCard();
    });
    // Слушатель на кнопку лайка
    this._likeButton.addEventListener('click', () => {
      this._isLiked();
    });
  }
}
