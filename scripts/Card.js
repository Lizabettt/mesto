import { openPopup, popupImgMax } from "./index.js";

class Card {
  constructor(dataObject, templateSelector) {
    this._name = dataObject.name;
    this._picture = dataObject.link;
    this._templateSelector = templateSelector;
  }
  //метод возврата разметки карточки /шаблон/
  _getTemplateCard() {
    const templateCard = document
      .querySelector("#elements-template")
      .content.querySelector(".elements__card")
      .cloneNode(true);
    return templateCard;
  }
  //метод получения данных из разметки/заполняем карточку данными/
  _setData() {
    this._newCard.querySelector(".elements__title").textContent = this._name;
    this._newCard.querySelector(".elements__pic").src = this._picture;
    this._newCard.querySelector(".elements__pic").alt = this._name;
  }
  //метод удаление карточки
  _deliteCard() {
    this._newCard.remove();
    this._newCard = null;
  }
  //метод лайка карточки
  _likeCard() {
    this._newCard
      .querySelector(".elements__like")
      .classList.toggle("elements__like-add");
  }
  // метод открытия попапа
  _openImagePopup() {
    document.querySelector(".popup__img-title").textContent = this._name;
    document.querySelector(".popup__img-max").src = this._picture;
    document.querySelector(".popup__img-max").alt = this._name;

    openPopup(popupImgMax); //ошибка
  }

  //метод обработчики событий
  _setEventListeners() {
    this._newCard
      .querySelector(".elements__basket")
      .addEventListener("click", () => this._deliteCard());

    this._newCard
      .querySelector(".elements__like")
      .addEventListener("click", () => this._likeCard());

    this._newCard
      .querySelector(".elements__pic")
      .addEventListener("click", () => this._openImagePopup());
  }

  //публичный метод сбора новой карточки
  createCard() {
    this._newCard = this._getTemplateCard();
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}
export default Card;
