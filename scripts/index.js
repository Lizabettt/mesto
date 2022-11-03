let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-job');
let nameProfil = document.querySelector('.profile__title');
let jobProfil = document.querySelector('.profile__info');


let btnChangeName = document.querySelector('.profile__change-name');
let btnClose = document.querySelector('.popup__btn-close');
let popup = document.querySelector('.popup');
let btnSave = document.querySelector('.popup__btn-save');

//ОТКРЫТИЕ
function openedPopup() {
    popup.classList.add('popup_opened');
    //текущее значение попап в окне импута присваиваем значение имени со страницы
    nameInput.value = nameProfil.textContent;
    jobInput.value = jobProfil.textContent;
}; 
//ОБРАБОТКА ФОРМЫ
function formSubmitHandler (evt) {
    evt.preventDefault(); // отмен. станд. отправку формы.
    //в форме значение со страницы заменяется на введеное вручную значение
    nameProfil.textContent = nameInput.value;
    jobProfil.textContent = jobInput.value;
};
//ЗАКРЫТИЕ
function closedPopup() {
    popup.classList.remove('popup_opened');
};
formElement
//ЗАПУСК ФУНКЦИЙ

btnChangeName.addEventListener('click', openedPopup);
btnClose.addEventListener('click', closedPopup);
formElement.addEventListener('submit', formSubmitHandler);  
btnSave.addEventListener('click', closedPopup);

 
  