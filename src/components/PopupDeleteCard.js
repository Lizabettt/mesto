import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._formPopup = this._basicPopup.querySelector(".popup__form");
  }
  //забираем данные карты
  sendConfirmation(submitCallBack) {
    this._submit = submitCallBack;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formPopup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit();
    });
  }
}
