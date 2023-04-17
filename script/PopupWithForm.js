import Popup from './Popup.js';

export default class PopupwithForm extends Popup {
  constructor(popupSelector, { callbackSubmit }) {
    super(popupSelector);
    // Форма
    this._popupForm = this._popup.querySelector('.popup__form');
    //Массив из инпутов формы
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    //Функция-колбек
    this._callbackSubmit = callbackSubmit;
  }
  //Собираем данныем со всех полей форм
  _getInputValues = () => {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
      console.log(this._inputValues);
    });
    //возвращаем массив
    return this._inputValues;
  };

  setEventListeners() {
    super.setEventListeners();
    //Добавляем обработчик сабмита всех полей формы
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      this._callbackSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    //ресет полей формы при закрытии
    this._popupForm.reset();
  }
}
