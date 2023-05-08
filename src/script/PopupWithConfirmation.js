import Popup from './Popup.js';

export default class PopupwithConfirmation extends Popup {
  constructor(popupSelector, { callbackSubmit }) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
  }

  handleSubmit(submitConfirm) {
    this._callbackSubmit = submitConfirm;
  }

  //Добавляем слушатель на кнопку submit - колбек и evt.preventDefault();
  open() {
    super.open();
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      this._callbackSubmit();
    });
  }
  //Удаляем слушатели на кнопку submit
  close() {
    super.close();
    this._popup.removeEventListener('submit', evt => {
      evt.preventDefault();
      this._callbackSubmit();
    });
  }
}
