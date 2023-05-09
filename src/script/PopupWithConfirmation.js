import Popup from './Popup.js';

export default class PopupwithConfirmation extends Popup {
  constructor(popupSelector, { callbackSubmit }) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
  }
  //Передаем колбэк
  handleSubmit(callback) {
    this._callbackSubmit = callback;
  }
  //Выносим в стрелочную функцию передачу колбэка
  _setEventForSubmit = e => {
    e.preventDefault();
    this._callbackSubmit();
  };

  setEventListeners() {
    super.setEventListeners();
    //Передаем функцию сабмиту + настраиваем отработку слушателя 1 раз { once: true }
    this._popup.addEventListener('submit', this._setEventForSubmit), { once: true };
  }
}
