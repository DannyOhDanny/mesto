import Popup from './Popup.js';

export default class popupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popup.querySelector('.popup__title');
    this._link = this._popup.querySelector('.popup__pic');
  }

  open(title, link) {
    //передаем аргументы в попап тут
    this._link.alt = title;
    this._title.textContent = title;
    this._link.src = link;
    super.open();
  }
}
