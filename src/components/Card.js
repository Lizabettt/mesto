export default class Card {
  constructor({ dataObject, templateSelector, handleCardClick }) {
    this._name = dataObject.name;
    this._picture = dataObject.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._newCard = this._getTemplateCard();
    this._elementsPic = this._newCard.querySelector(".elements__pic");
    this._elementsLike = this._newCard.querySelector(".elements__like");
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
    this._elementsPic.src = this._picture;
    this._elementsPic.alt = this._name;
  }

  //метод удаление карточки
  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  //метод лайка карточки
  _likeCard() {
    this._elementsLike.classList.toggle("elements__like-add");
  }

  //метод обработчики событий
  _setEventListeners() {
    this._newCard
      .querySelector(".elements__basket")
      .addEventListener("click", () => this._deleteCard());
    this._elementsLike.addEventListener("click", () => this._likeCard());
    this._elementsPic.addEventListener("click", () =>
      this._handleCardClick(this._name, this._picture)
    );
  }
  //публичный метод сбора новой карточки
  createCard() {
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}
