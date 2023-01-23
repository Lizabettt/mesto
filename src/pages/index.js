import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import {
  initialCards,
  validationConfig,
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
      const Card = buildCard(infoCard);
      showСards.addItem(Card);
    },
  },
  cardBox
);

const popupWithPic = new PopupWithImage(".popup_type-img");
popupWithPic.setEventListeners();

const buildCard = (infoCard) => {
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

const popupFormProfile = new PopupWithForm(".popup_type-profile", (data) => {
  infoUser.setUserInfo(data);
  popupFormProfile.close();
});
popupFormProfile.setEventListeners();

const profilePopup = () => {
  const profileInfo = infoUser.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.about;
  popupFormProfile.open();
};

const popupFormNewCard = new PopupWithForm(
  ".popup_type-add-new-card",
  (data) => {
    const itemCard = {
      name: data.namePlace,
      link: data.linkPlace,
    };
    showСards.addItem(buildCard(itemCard));
    popupFormNewCard.close();
  }
);
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
