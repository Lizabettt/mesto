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
  nameProfile,
  jobProfile,
  avatarProfile,
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
const infoUser = new UserInfo(nameProfile, jobProfile, avatarProfile);

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
        infoUser.setUserInfo(dataProfile);
        popupFormProfile.close();
      })
      .catch((err) => {
        console.log(err);
      });
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
        showСards.addItemNew(buildCard(data)); //перевернули массив
        popupFormNewCard.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

const popupFormNewAvatar = new PopupWithForm(".popup_type-user-foto", {
  submitForm: (data) => {
    api
      .changeAvatar(data)
      .then((dataAva) => {
        infoUser.setUserAvatar(dataAva);
        popupFormNewAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      });
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
