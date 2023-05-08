export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  //Отрисовка каждой карточки, полученной с сервера
  renderItems(res) {
    res.forEach(this._renderer);
  }

  addItem = element => {
    this._container.prepend(element);
  };
}
