import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);

    this._submitForm = submitForm;
    this._formPopup = this._basicPopup.querySelector(".popup__form");
    this._inputs = this._formPopup.querySelectorAll(".popup__input");
  }
  _getInputValues() {
    //собирает данные всех импутов
    this._objInput = {};
    this._inputs.forEach((input) => {
      this._objInput[input.name] = input.value;
      console.log(this._objInput);
    });
    return this._objInput;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formPopup.addEventListener("submit", (evt) => {
      this._submitForm(this._getInputValues());
      evt.preventDefault();
      this.close();
    });
  }

  close() {
    super.close();
    this._formPopup.reset();
  }
}
