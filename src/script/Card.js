// Класс Card, создающий карточки по конструктору из массива.
export default class Card {
  constructor(cardData, templateSelector, handleCardClick, userId) {
    this._cardItem = cardData;
    this._title = this._cardItem.name;
    this._link = this._cardItem.link;
    this._alt = this._cardItem.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._ownerId = this._cardItem.owner._id;
    this._userId = userId;
  }
  // Создаем шаблон карточки
  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardElement;
  };

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

    // Отображение лайков
    this.showLikes(this._cardItem);

    //Сравниваем свой ID  c ID карточки
    if (this._ownerId !== this._userId) {
      this._deleteButton.classList.add('element__delete-btn_type_hidden');
      console.log(`АВТОР: ${this._ownerId}`);
      console.log(`Я: ${this._userId}`);
    }

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
      this._removeCard();
    });

    // Слушатель на кнопку лайка
    this._likeButton.addEventListener('click', () => {
      this._isLiked();
    });
  }
}
