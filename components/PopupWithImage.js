import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);

    this._title = this._basicPopup.querySelector(".popup__img-title");
    this._picture = this._basicPopup.querySelector(".popup__img-max");
  }

  open(name, link) {
    super.open();
    this._title.textContent = name;
    this._picture.src = link;
    this._picture.alt = name;
  }
}
