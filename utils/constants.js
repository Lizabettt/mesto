export const initialCards = [
  {
    name: "Парящий орёл",
    link: "https://images.unsplash.com/photo-1666112308178-d7511ed45436?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1758&q=80",
  },
  {
    name: "Слоны",
    link: "https://images.unsplash.com/photo-1666167469639-9d3f88757ef3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1273&q=80",
  },
  {
    name: "Лисица",
    link: "https://images.unsplash.com/photo-1666512244128-a69c6d115dce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Жираф",
    link: "https://images.unsplash.com/photo-1666274802032-e1f9fb2356a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    name: "Обезьянка",
    link: "https://images.unsplash.com/photo-1666105956517-bb1aefae7842?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
  },
  {
    name: "Совушка",
    link: "https://images.unsplash.com/photo-1665436664161-29a4468aed6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80",
  },
];

export const validationConfig = {
  formPopup: ".popup__form",
  inputFormPopup: ".popup__input",
  buttonSubmit: ".popup__btn",
  inputError: "popup__input_type_error",
  errorClassVisible: "popup__error_visible",
};

export const popupProfile = document.querySelector(".popup_type-profile");
export const popupNewCard = document.querySelector(".popup_type-add-new-card");
export const popupImgMax = document.querySelector(".popup_type-img");

export const formChangeProfile = document.querySelector(
  ".popup__form_type-profile"
);
export const formAddNewCard = document.querySelector(
  ".popup__form_type-add-new-card"
);

export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_job");
export const nameProfile = document.querySelector(".profile__title");
export const jobProfile = document.querySelector(".profile__info");

export const btnChangeName = document.querySelector(".profile__change-name");
export const btnAddCard = document.querySelector(".profile__button-add");

export const cardBox = document.querySelector(".elements__grid");
