export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = selector;
  }

  addItem(elem) {
    this._container.prepend(elem);
  }

  renderItems() {
    this._renderedItems.forEach((itemCard) => {
      this._renderer(itemCard);
    });
  }
}