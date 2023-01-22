import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css"
import {
  initialCards,
  validationConfig,
  popupProfile,
  popupNewCard,
  popupImgMax,
  formChangeProfile,
  formAddNewCard,
  nameInput,
  jobInput,
  nameProfile,
  jobProfile,
  btnChangeName,
  btnAddCard,
  cardBox,
} from "../utils/constants.js";

const showСards = new Section(
  {
    items: initialCards,
    renderer: (infoCard) => {
      const allCards = renderCard(infoCard);
      showСards.addItem(allCards);
    },
  },
  cardBox
);

const popupWithPic = new PopupWithImage(popupImgMax);
popupWithPic.setEventListeners();

const renderCard = (infoCard) => {
  const card = new Card({
    dataObject: infoCard,
    templateSelector: "#elements-template",
    handleCardClick: (name, link) => {
      popupWithPic.open(name, link);
    },
  });
  return card.createCard();
};

showСards.renderItems();

const infoUser = new UserInfo(nameProfile, jobProfile);

const popupFormProfile = new PopupWithForm(popupProfile, (data) => {
  infoUser.setUserInfo(data);
  popupFormProfile.close();
  console.log("nsw");
});
popupFormProfile.setEventListeners();

const profilePopup = () => {
  const profileInfo = infoUser.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.about;
  popupFormProfile.open();
};

const popupFormNewCard = new PopupWithForm(popupNewCard, (data) => {
  const itemCard = {
    name: data.namePlace,
    link: data.linkPlace,
  };
  showСards.addItem(renderCard(itemCard));
  popupFormNewCard.close();
});
popupFormNewCard.setEventListeners();

btnChangeName.addEventListener("click", profilePopup);
btnAddCard.addEventListener("click", () => {
  popupFormNewCard.open();
});

const validFormChangeProfile = new FormValidator(
  validationConfig,
  formChangeProfile
);

validFormChangeProfile.enableValidation();

const validFormAddNewCard = new FormValidator(validationConfig, formAddNewCard);

validFormAddNewCard.enableValidation();