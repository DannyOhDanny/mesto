import Popup from './Popup.js';

export default class PopupwithConfirmation extends Popup {
  constructor(popupSelector, { callbackSubmit }) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
  }

  open() {
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
