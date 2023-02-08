export default class Card {
  constructor({
    dataObject,
    idMy,
    templateSelector,
    handleCardClick,
    handleDeleteCard,
    handleAddLikeCard,
    handleRemoveLikeCard,
  }) {
    this._name = dataObject.name;
    this._picture = dataObject.link;
    this._idOwner = dataObject.owner._id;
    this._idCard = dataObject._id;
    this._likesCards = dataObject.likes;

    this._idMy = idMy;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleAddLikeCard = handleAddLikeCard;
    this._handleRemoveLikeCard = handleRemoveLikeCard;

    this._newCard = this._getTemplateCard();
    this._elementsPic = this._newCard.querySelector(".elements__pic");
    this._elementsLike = this._newCard.querySelector(".elements__like");
    this._elementsBasket = this._newCard.querySelector(".elements__basket");
    this._elementslikesСounter = this._newCard.querySelector(
      ".elements__like-span"
    );
  }

  //метод возврата разметки карточки /шаблон/
  _getTemplateCard() {
    const templateCard = document
      .querySelector(this._templateSelector)
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

  //убираем корзину с карт др пользователей
  _noBusket() {
    if (!(this._idMy === this._idOwner)) {
      this._elementsBasket.remove();
    }
  }

  _myLike() {
    this._likesCards.forEach((element) => {
      if (this._idMy === element._id) {
        this._elementsLike.classList.add("elements__like-add");
      }
    });
  }

  //метод удаление карточки сделали публичным
  delete() {
    this._newCard.remove();
    this._newCard = null;
  }

  //отрисуй лайки
  renderLikes(data) {
    this._elementslikesСounter.textContent = data.length;
  }

  //ставим лайки?
  addLikeCard(){
    this._elementsLike.classList.add("elements__like-add");
  }
  removeLikeCard(){
    this._elementsLike.classList.remove("elements__like-add");
  }
  setLikes() {
    if (this._elementsLike.classList.contains("elements__like-add")) {      
      this._handleRemoveLikeCard(this._idCard);
    } else {      
      this._handleAddLikeCard(this._idCard);
    }
  }

  //метод обработчики событий
  _setEventListeners() {
    this._elementsBasket.addEventListener("click", () =>
      this._handleDeleteCard(this._idCard)
    );
    this._elementsLike.addEventListener("click", () => this.setLikes());
    this._elementsPic.addEventListener("click", () =>
      this._handleCardClick(this._name, this._picture)
    );
  }

  //публичный метод сбора новой карточки
  createCard() {
    this._setData();
    this._setEventListeners();

    this._noBusket();
    this.renderLikes(this._likesCards);
    this._myLike();
    return this._newCard;
  }
}
