export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  //Метод открытия попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  //Метод закрытия попапа
  close() {
    this._popup.classList.remove('popup_opened');
    //удаление навешанных ранее слушателей
    document.removeEventListener('keydown', this._handleEscClose);
  }
  //Метод закрытия попапа по нажатию кнопки ESC
  _handleEscClose = evt => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };
  //Установка слушателей на попап для закрытия по клику на фон и на кнопку закрытия
  setEventListeners() {
    this._popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__button-close')) {
        this.close();
      }
    });
  }
}
