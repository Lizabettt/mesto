const popupProfile = document.querySelector('.popup_type-profile');
const popupNewCard = document.querySelector('.popup_type-add-new-card');
const popupImgMax = document.querySelector('.popup_type-img');

const formChangeProfile = document.querySelector('.popup__form_type-profile');
const formAddNewCard = document.querySelector('.popup__form_type-add-new-card');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__info');

const namePlaceInput = document.querySelector('.popup__input_type_name-place');
const linkPlaceInput = document.querySelector('.popup__input_type_link-place');

const closeBtns = document.querySelectorAll('.popup__btn-close');
const btnChangeName = document.querySelector('.profile__change-name');
const btnAddCard = document.querySelector('.profile__button-add');
const btnCreate = document.querySelector('.popup__btn-create')
const buttonLike = document.querySelector('.elements__like');

const imgMaxCard = document.querySelector('.popup__img-max');
const titleMaxCard = document.querySelector('.popup__img-title');

const cardBox = document.querySelector('.elements__grid');
const templateCard = document.querySelector('#elements-template').content.querySelector('.elements__card');


//ОТКРЫТИЕ ПОПАПА
function openPopup(namePopup) {
    namePopup.classList.add('popup_opened');
}; 

//ЗАКРЫТИЕ ПОПАПА
function closePopup(namePopup) {
    namePopup.classList.remove('popup_opened');
    document.removeEventListener("keydown", handleCloseByEscapePush); 
    
};

//закрытие по кнопке
closeBtns.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));

});

//закрытие по эскейпу
function handleCloseByEscapePush(evt) {
    if (evt.key === 'Escape') {
        const popupOpen = document.querySelector('.popup_opened') 
        closePopup(popupOpen);           
        } 
    };

//закрытие по оверлею
function handleCloseByOverlayClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {       
        closePopup(evt.target); 
        }      
    };


//ОТКРЫТИЕ ПОПАПА ПРОФИЛЯ
function openProfilePopup() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openPopup(popupProfile);
    
};

//ОТКРЫТИЕ ПОПАПА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
function openAddCardPopup() {
     openPopup(popupNewCard);
     btnCreate.disabled = true;
    };

//КАРТОЧКИ
//удаление карточки
const handleDeleteClick = (evt) => {
    evt.target.closest('.elements__card').remove();
}

//лайк карточке

const handleLikeClick = (evt) => {
    evt.target.classList.toggle('elements__like-add');
}

// function handleLikeClick(buttonLike) {
//     buttonLike.classList.add('elements__like-add');
// };
  


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
          
        imgMaxCard.src = infoCard.link;
        imgMaxCard.alt = infoCard.name ;
        titleMaxCard.textContent = infoCard.name;

        openPopup(popupImgMax);
    };

    btnDelCard.addEventListener('click', handleDeleteClick);
    btnAddLike.addEventListener('click', handleLikeClick);
    imgCard.addEventListener('click', openImagePopup);

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

function handleProfileFormSubmit (evt) {
    evt.preventDefault(); // отмен. станд. отправку формы.
    
    nameProfile.textContent = nameInput.value;//в форме значение со страницы заменяется на введеное вручную значение
    jobProfile.textContent = jobInput.value;
    
    closePopup(popupProfile);   
};

//обработка формы карточки

function handleFormAddCardSubmit (evt) {
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
btnAddCard.addEventListener('click', openAddCardPopup);
formChangeProfile.addEventListener('submit', handleProfileFormSubmit);
formAddNewCard.addEventListener('submit', handleFormAddCardSubmit);
popupProfile.addEventListener('click', handleCloseByOverlayClick);
popupNewCard.addEventListener('click', handleCloseByOverlayClick);
popupImgMax.addEventListener('click', handleCloseByOverlayClick);
document.addEventListener("keydown", handleCloseByEscapePush); 