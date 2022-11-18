const popupPerson = document.querySelector('.popup_type-person');
const popupNewCard = document.querySelector('.popup_type-add-new-card');
const popupImgMax = document.querySelector('.popup_type-img');

const formChangePerson = document.querySelector('.popup__form_type-person');
const formAddNewCard = document.querySelector('.popup__form_type-add-new-card');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameProfil = document.querySelector('.profile__title');
const jobProfil = document.querySelector('.profile__info');

const namePlaceInput = document.querySelector('.popup__input_type_name-place');
const linkPlaceInput = document.querySelector('.popup__input_type_link-place');

const btnsClose = document.querySelectorAll('.popup__btn-close');
const btnChangeName = document.querySelector('.profile__change-name');
const btnAddCard = document.querySelector('.profile__button-add');

const imgMaxCard = document.querySelector('.popup__img-max');
const titleMaxCard = document.querySelector('.popup__img-title');
const imgCard = document.querySelector('.elements__pic');

const cardBox = document.querySelector('.elements__grid');
const templateCard = document.querySelector('#elements-template').content.querySelector('.elements__card');
const initialCards = [
    {
        name: 'Парящий орёл',
        link: 'https://images.unsplash.com/photo-1666112308178-d7511ed45436?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1758&q=80'
    },
    {
        name: 'Слоны',
        link: 'https://images.unsplash.com/photo-1666167469639-9d3f88757ef3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1273&q=80'
    },
    {
        name: 'Лисица',
        link: 'https://images.unsplash.com/photo-1666512244128-a69c6d115dce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Жираф',
        link: 'https://images.unsplash.com/photo-1666274802032-e1f9fb2356a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Обезьянка',
        link: 'https://images.unsplash.com/photo-1666105956517-bb1aefae7842?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
    },
    {
        name: 'Совушка',
        link: 'https://images.unsplash.com/photo-1665436664161-29a4468aed6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80'
    }
];

//ОТКРЫТИЕ ПОПАПА
function openedPopup(namePopup) {
    namePopup.classList.add('popup_opened');
}; 

//ЗАКРЫТИЕ ПОПАПА
function closedPopup(namePopup) {
    namePopup.classList.remove('popup_opened');    
};
btnsClose.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closedPopup(popup));

});

//ИМЯ ПОЛЬЗОВАТЕЛЯ В ФОРМЕ ПОПАПА ПРИ ОТКРЫТИИ
function addOldPersonNameInInput() {
    nameInput.value = nameProfil.textContent;
    jobInput.value = jobProfil.textContent;
    openedPopup(popupPerson);
};

//ОЧИЩЕНИЕ ФОРМЫ ПРИ ОТКРЫТИИИ ДОБАВЛЕНИЯ КАРТОЧКИ
function cleanFormAddNewCard() {
    namePlaceInput.value = '';
    linkPlaceInput.value = '';
    openedPopup(popupNewCard);
};

//КАРТОЧКИ


//удаление карточки
const deleteCard = (evt) => {
    evt.target.closest('.elements__card').remove();
}

//лайк карточке
const likeCard = (evt) => {
    evt.target.closest('.elements__like').classList.toggle('elements__like-add');
}

//создание новой карточки по образцу из "коробки"
const collectCard = (infoCard) => {

    const newCard = templateCard.cloneNode(true);// клонирование templateCard со всем содержимым
    const titleCard = newCard.querySelector('.elements__title');
    const imgCard = newCard.querySelector('.elements__pic');
    const btnDelCard = newCard.querySelector('.elements__basket');
    const btnAddLike = newCard.querySelector('.elements__like');

    titleCard.textContent = infoCard.name;
    imgCard.src = infoCard.link;
    imgCard.alt = infoCard.name;
     
    function seeMaxImgCard() {
          
        imgMaxCard.src = imgCard.src;
        imgMaxCard.alt = imgCard.alt ;
        titleMaxCard.textContent = titleCard.textContent  ;

        openedPopup(popupImgMax);
    };

    btnDelCard.addEventListener('click', deleteCard);
    btnAddLike.addEventListener('click', likeCard);
    imgCard.addEventListener('click',seeMaxImgCard);

    return newCard;
}

//покажи карточку
const renderCard = (infoCard) => {
    cardBox.prepend(collectCard(infoCard)); 
};

//рендер (отображение) всех карточек
initialCards.forEach((infoCard) => {
    renderCard(infoCard);
});

//ОБРАБОТКА ФОРМ 

// обработка формы пользователя

function processingFormChangePerson (evt) {
    evt.preventDefault(); // отмен. станд. отправку формы.
    
    nameProfil.textContent = nameInput.value;//в форме значение со страницы заменяется на введеное вручную значение
    jobProfil.textContent = jobInput.value;
    
    closedPopup(popupPerson);   
};

//обработка формы карточки

function processingFormAddCard (evt) {
    evt.preventDefault();

    const infoCard = {
        name: namePlaceInput.value,
        link: linkPlaceInput.value
    } 

    renderCard(infoCard);
    closedPopup(popupNewCard);    
};

//ЗАПУСК ФУНКЦИЙ

btnChangeName.addEventListener('click',addOldPersonNameInInput);
btnAddCard.addEventListener('click', cleanFormAddNewCard);
formChangePerson.addEventListener('submit', processingFormChangePerson);
formAddNewCard.addEventListener('submit', processingFormAddCard);


//закрытие по тени
//window.addEventListener('click', closedPopupClickShadow);
// const closedPopupClickShadow = (evt) => {
//     evt.target.closest('.popup').remove('popup_opened');
// }
