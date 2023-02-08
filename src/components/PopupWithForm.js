import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, { submitForm }) {
    super(selectorPopup);

    this._submitForm = submitForm;

    this._formPopup = this._basicPopup.querySelector(".popup__form");
    this._inputs = this._formPopup.querySelectorAll(".popup__input");
    this._buttom = this._formPopup.querySelector(".popup__btn");
  }
  _getInputValues() {
    //собирает данные всех импутов
    this._objInput = {};
    this._inputs.forEach((input) => {
      this._objInput[input.name] = input.value;
    });
    return this._objInput;
  }

  setConservationText(text) {
    this._buttom.textContent = text;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formPopup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._buttom.textContent = "Сохранение...";
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formPopup.reset();
  }
}
