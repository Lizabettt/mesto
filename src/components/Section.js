export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = selector;
  }

  addItem(cardData) {
    this._container.append(cardData);
  }
  addItemNew(cardData) {
    this._container.prepend(cardData);
}
  
  renderItems(itemCards) {
    itemCards.forEach((itemCard) => {
      this._renderer(itemCard);
    });
  }
}