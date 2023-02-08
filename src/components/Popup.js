export default class Popup {
  constructor(selectorPopup) {
   
    this._basicPopup = document.querySelector(selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._basicPopup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._basicPopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleBtnClose(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains("popup__btn-close-pic")) {
      this.close();
    }
  }

  setEventListeners() {
    this._basicPopup.addEventListener("click", (evt) => {
      this._handleOverlayClose(evt) || this._handleBtnClose(evt);
    });
  }
}