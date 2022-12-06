
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

const closeBtns = document.querySelectorAll('.popup__btn-close');
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
function openPopup(namePopup) {
    namePopup.classList.add('popup_opened');
}; 

//ЗАКРЫТИЕ ПОПАПА
function closePopup(namePopup) {
    namePopup.classList.remove('popup_opened');    
};

//закрытие по кнопке
closeBtns.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));

});

//закрытие по эскейпу
function closeEsc(evt) {
    if (evt.keyCode === 27) {
        const popupOpen = document.querySelector('.popup_opened')
        closePopup(popupOpen);    
    } 
};

//закрытие по оверлею
function closedPopupClickShadow(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        const popupOpen = document.querySelector('.popup_opened')
        closePopup(popupOpen); 
    }
    
};


//ОТКРЫТИЕ ПОПАПА ПРОФИЛЯ
function openProfilePopup() {
    nameInput.value = nameProfil.textContent;
    jobInput.value = jobProfil.textContent;
    openPopup(popupPerson);
};

//ОТКРЫТИЕ ПОПАПА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function addNewCard() {
     openPopup(popupNewCard);
};

//КАРТОЧКИ
//удаление карточки
const deleteCard = (evt) => {
    evt.target.closest('.elements__card').remove();
}

//лайк карточке
const likeCard = (evt) => {
    evt.target.classList.toggle('elements__like-add');
}

//создание новой карточки по образцу из "коробки"
const createCard = (infoCard) => {

    const newCard = templateCard.cloneNode(true);// клонирование templateCard со всем содержимым
    const titleCard = newCard.querySelector('.elements__title');
    const imgCard = newCard.querySelector('.elements__pic');
    const btnDelCard = newCard.querySelector('.elements__basket');
    const btnAddLike = newCard.querySelector('.elements__like');

    titleCard.textContent = infoCard.name;
    imgCard.src = infoCard.link;
    imgCard.alt = infoCard.name;
     
    function openImagePopup() {
          
        imgMaxCard.src = imgCard.src;
        imgMaxCard.alt = imgCard.alt ;
        titleMaxCard.textContent = titleCard.textContent  ;

        openPopup(popupImgMax);
    };

    btnDelCard.addEventListener('click', deleteCard);
    btnAddLike.addEventListener('click', likeCard);
    imgCard.addEventListener('click',openImagePopup);

    return newCard;
}

//покажи карточку
const renderCard = (infoCard) => {
    cardBox.prepend(createCard(infoCard)); 
};

//рендер (отображение) всех карточек
initialCards.forEach(renderCard);

//ОБРАБОТКА ФОРМ 

// обработка формы пользователя

function handleFormChangePerson (evt) {
    evt.preventDefault(); // отмен. станд. отправку формы.
    
    nameProfil.textContent = nameInput.value;//в форме значение со страницы заменяется на введеное вручную значение
    jobProfil.textContent = jobInput.value;
    
    closePopup(popupPerson);   
};

//обработка формы карточки

function handleFormAddCard (evt) {
    evt.preventDefault();

    const infoCard = {
        name: namePlaceInput.value,
        link: linkPlaceInput.value
    } 
    evt.target.reset();
    renderCard(infoCard);
    closePopup(popupNewCard);    
};

//ЗАПУСК ФУНКЦИЙ

btnChangeName.addEventListener('click',openProfilePopup);
btnAddCard.addEventListener('click', addNewCard);
formChangePerson.addEventListener('submit', handleFormChangePerson);
formAddNewCard.addEventListener('submit',handleFormAddCard);
document.addEventListener('click', closedPopupClickShadow);//убирать обработчик?
document.addEventListener("keydown", closeEsc); 