// Класс Card, создающий карточки по конструктору из массива.

export default class Card {
  constructor(
    cardData,
    templateSelector,
    { handleCardClick },
    userId,
    { handleCardDelete },
    { handleCardLikes }
  ) {
    //Данные карточки - название, сслыка, альт, лайки
    this._cardItem = cardData;
    this._title = this._cardItem.name;
    this._link = this._cardItem.link;
    this._alt = this._cardItem.name;
    this._likes = this._cardItem.likes;
    //Колбеки увеличения, удаления, лайка
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLikes = handleCardLikes;
    //Селектор шаблона
    this._templateSelector = templateSelector;
    //IDs
    this._userId = userId;
    this._cardId = this._cardItem._id;
    this._ownerId = this._cardItem.owner._id;
  }

  // Создаем шаблон карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  // Удалить карточки из DOM
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  // Проверка наличия моего лайка на карточке
  hasMyLike() {
    return this._likes.some(user => user._id === this._userId);
  }
  // Лайкнуть/убрать лайк с карточки
  isLiked() {
    this._likeButton.classList.add('element__heart_active');
  }
  isNotLiked() {
    this._likeButton.classList.remove('element__heart_active');
  }
  //Переключаем иконку лайка по результатут проверки массива лайков карточки.
  _checkMyLike() {
    this.hasMyLike() ? this.isLiked() : this.isNotLiked();
  }
  //Сравниваем свой ID c ID автора карточки
  _checkMyCard() {
    if (this._ownerId !== this._userId) {
      this._deleteButton.classList.add('element__delete-btn_type_hidden');
    }
  }
  // Загрузка кол-ва лайков с сервера - находим св-во объекта и длинну массива и передаем во вне
  showCardLikes(data) {
    this._likes = data;
    this._likeElement.textContent = this._likes.length;
  }
  //Генерация карточки
  generateCard() {
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

    // Отображение и проверка ID лайков
    this.showCardLikes(this._likes);

    this._checkMyLike();

    //Сравниваем свой ID c ID автора карточки
    this._checkMyCard();

    //console.log(`owner ID: ${this._ownerId}`);
    //console.log(`my ID: ${this._userId}`);
    //console.log(`card ID: ${this._cardId}`);

    // Возврат карточки
    return this._element;
  }

  //Слушатели на клик по изображению, корзине, лайку:
  _setEventListeners() {
    //Слушатель на картинку
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });

    //Слушатель на кнопку удаления
    this._deleteButton.addEventListener('click', () => {
      this._handleCardDelete(this);
    });

    // Слушатель на кнопку лайка
    this._likeButton.addEventListener('click', () => {
      this._handleCardLikes(this);
    });
  }
}
