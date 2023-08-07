export default class Section {
  constructor ({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(cardsArray, userData) {
    // this.clear();
    cardsArray.forEach(cardObj => {
      this._renderer(cardObj, userData);
    });
  }
}