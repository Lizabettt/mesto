import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import {
  validationConfig,
  formChangeProfile,
  formAddNewCard,
  formChangeAvatar,
  nameInput,
  jobInput,
  avatarProfileBtn,
  btnChangeName,
  btnAddCard,
  cardBox,
} from "../utils/constants.js";

let idMy;

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-58",
  headers: {
    authorization: "5e82f2f9-4ad1-4820-bbab-0c86035a81ab",
    "Content-Type": "application/json",
  },
});
const infoUser = new UserInfo({
  nameProfile: ".profile__title",
  jobProfile: ".profile__info",
  avatarProfile:".profile__foto"
});

//получаем все данные с сервера и показываем на странице
Promise.all([api.getUserData(), api.getAllCards()]).then(
  ([userData, cardData]) => {
    idMy = userData._id;
    infoUser.setUserInfo(userData);
    infoUser.setUserAvatar(userData);

    showСards.renderItems(cardData);
  }
);

const showСards = new Section(
  {
    renderer: (infoCard) => {
      const Card = buildCard(infoCard);
      showСards.addItem(Card);
    },
  },
  cardBox
);

const popupWithPic = new PopupWithImage(".popup_type-img");
popupWithPic.setEventListeners();

const popupDeleteCard = new PopupDeleteCard(".popup_type-delete");
popupDeleteCard.setEventListeners();

const buildCard = (infoCard) => {
  const card = new Card({
    dataObject: infoCard,
    idMy: idMy,
    templateSelector: "#elements-template",
    handleCardClick: (name, link) => {
      popupWithPic.open(name, link);
    },
    handleDeleteCard: (idCard) => {
      popupDeleteCard.open();
      popupDeleteCard.sendConfirmation(() => {
        api
          .deleteCard(idCard)
          .then(() => {
            card.delete();
            popupDeleteCard.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    handleAddLikeCard: (idCard) => {
      api
        .addLike(idCard)
        .then((arrCard) => {
          card.addLikeCard();
          card.renderLikes(arrCard.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleRemoveLikeCard: (idCard) => {
      api
        .removeLike(idCard)
        .then((arrCard) => {
          card.removeLikeCard();
          card.renderLikes(arrCard.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return card.createCard();
};

const popupFormProfile = new PopupWithForm(".popup_type-profile", {
  submitForm: (data) => {
    api
      .changeUserData(data)
      .then((dataProfile) => {
        validFormChangeProfile.disableSubmitButton();
        infoUser.setUserInfo(dataProfile);
        popupFormProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupFormProfile.setConservationText("Сохранить");        
      })
  },
});

const profilePopup = () => {
  const profileInfo = infoUser.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.about;
  popupFormProfile.open();
};

const popupFormNewCard = new PopupWithForm(".popup_type-add-new-card", {
  submitForm: (data) => {
    const itemCard = {
      name: data.namePlace,
      link: data.linkPlace,
    };
    api
      .createNewCard(itemCard)
      .then((data) => {
        validFormAddNewCard.disableSubmitButton();
        showСards.addItemNew(buildCard(data)); //перевернули массив
        popupFormNewCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupFormNewCard.setConservationText("Создать");        
      })
  },
});

const popupFormNewAvatar = new PopupWithForm(".popup_type-user-foto", {
  submitForm: (data) => {
    api
      .changeAvatar(data)
      .then((dataAva) => {
        validFormAddNewAvatar.disableSubmitButton();
        infoUser.setUserAvatar(dataAva);
        popupFormNewAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupFormNewAvatar.setConservationText("Сохранить");        
      })
  },
});

popupFormProfile.setEventListeners();
popupFormNewCard.setEventListeners();
popupFormNewAvatar.setEventListeners();

btnChangeName.addEventListener("click", profilePopup);
btnAddCard.addEventListener("click", () => {
  popupFormNewCard.open();
});
avatarProfileBtn.addEventListener("click", () => {
  popupFormNewAvatar.open();
});

const validFormAddNewAvatar = new FormValidator(
  validationConfig,
  formChangeAvatar
);
validFormAddNewAvatar.enableValidation();

const validFormChangeProfile = new FormValidator(
  validationConfig,
  formChangeProfile
);
validFormChangeProfile.enableValidation();

const validFormAddNewCard = new FormValidator(validationConfig, formAddNewCard);
validFormAddNewCard.enableValidation();
