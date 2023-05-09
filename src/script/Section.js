export default class Section {
  constructor({ itemRenderer }, containerSelector) {
    this._items = itemRenderer;
    this._container = document.querySelector(containerSelector);
  }
  //Отрисовка каждой карточки, полученной с сервера
  renderItems(res) {
    res.forEach(this._items);
  }
  //Добавление элемента в контейнер
  addItem = element => {
    this._container.prepend(element);
  };
}
