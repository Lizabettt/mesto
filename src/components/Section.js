export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    // не понимаю пока как это сделать
    //все решения приводят к поломке
    this._renderer = renderer;
    this._container = selector;
  }

  addItem(cardData) {
    this._container.prepend(cardData);
  }
  
  renderItems() {
    this._renderedItems.forEach((itemCard) => {
      this._renderer(itemCard);
    });
  }
}