import Card from "./Card.js";
import {initialCards, validationConfig} from "./constants.js";
import FormValidator from "./FormValidator.js";

const popupProfile = document.querySelector(".popup_type-profile");
const popupNewCard = document.querySelector(".popup_type-add-new-card");
const popupImgMax = document.querySelector(".popup_type-img");
const popupImgTitle = document.querySelector(".popup__img-title")
const popupImage = document.querySelector(".popup__img-max")

const formChangeProfile = document.querySelector(".popup__form_type-profile");
const formAddNewCard = document.querySelector(".popup__form_type-add-new-card");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__info");

const namePlaceInput = document.querySelector(".popup__input_type_name-place");
const linkPlaceInput = document.querySelector(".popup__input_type_link-place");

const closeBtns = document.querySelectorAll(".popup__btn-close");
const btnChangeName = document.querySelector(".profile__change-name");
const btnAddCard = document.querySelector(".profile__button-add");

const cardBox = document.querySelector(".elements__grid");


//ОТКРЫТИЕ ПОПАПА 
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleCloseByEscapePush);
}
//ОТКРЫТИЕ ПОПАПА ПРОФИЛЯ
function openProfilePopup() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupProfile);
}

//ОТКРЫТИЕ ПОПАПА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function openAddCardPopup() {
  openPopup(popupNewCard);
  validFormAddNewCard.disableSubmitButton();
}

//ОТКЫТИЕ ПОПАПА КАРТИНКИ
function openImagePopup(name, picture) {
  popupImgTitle.textContent = name;
  popupImage.src = picture;
  popupImage.alt = name;

  openPopup(popupImgMax); //ошибка
}

//ЗАКРЫТИЕ ПОПАПА
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleCloseByEscapePush);
}

//закрытие по кнопке
closeBtns.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

//закрытие по эскейпу
function handleCloseByEscapePush(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//закрытие по оверлею
function handleCloseByOverlayClick(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

//КАРТОЧКИ

//покажи карточку
const renderCard = (infoCard) => {
  const card = new Card(infoCard, "#elements-template", openImagePopup);
  cardBox.prepend(card.createCard());
};
//рендер (отображение) всех карточек
initialCards.forEach(renderCard);

//ОБРАБОТКА ФОРМ

//обработка формы пользователя

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // отмен. станд. отправку формы.

  nameProfile.textContent = nameInput.value; //в форме значение со страницы заменяется на введеное вручную значение
  jobProfile.textContent = jobInput.value;

  closePopup(popupProfile);
}

//обработка формы карточки

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();

  const infoCard = {
    name: namePlaceInput.value,
    link: linkPlaceInput.value,
  };
  evt.target.reset();
  renderCard(infoCard);
  closePopup(popupNewCard);
}

//ЗАПУСК ФУНКЦИЙ

btnChangeName.addEventListener("click", openProfilePopup);
btnAddCard.addEventListener("click", openAddCardPopup);
formChangeProfile.addEventListener("submit", handleProfileFormSubmit);
formAddNewCard.addEventListener("submit", handleFormAddCardSubmit);
popupProfile.addEventListener("click", handleCloseByOverlayClick);
popupNewCard.addEventListener("click", handleCloseByOverlayClick);
popupImgMax.addEventListener("click", handleCloseByOverlayClick);



//валидация улетает на класс с конструктором
const validFormChangeProfile = new FormValidator(
  validationConfig,
  formChangeProfile
);
validFormChangeProfile.enableValidation();

const validFormAddNewCard = new FormValidator(
  validationConfig, 
  formAddNewCard);

validFormAddNewCard.enableValidation();