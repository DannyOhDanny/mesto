import Popup from './Popup.js';

export default class popupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popup.querySelector('.popup__title');
    this._link = this._popup.querySelector('.popup__pic');
  }

  open(name, link) {
    //Передаем аргументы картинки в шаблон попапа
    this._link.alt = name;
    this._title.textContent = name;
    this._link.src = link;
    super.open();
  }
}
