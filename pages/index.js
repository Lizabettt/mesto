
    let formElement = document.querySelector('.popup__form');
    let nameInput = document.querySelector('.popup__name');
    let jobInput = document.querySelector('.popup__job');
    let nameProfil = document.querySelector('.profile__title');
    let jobProfil = document.querySelector('.profile__info');
    

    let btnChangeName = document.querySelector('.profile__change-name');
    let btnClose = document.querySelector('.popup__btn-close');
    let popup= document.querySelector('.popup');
    let btnSave= document.querySelector('.popup__btn-save'); 

function openPopup() {
    popup.classList.add('popup__opened');
    nameInput.value = nameProfil.textContent;
    jobInput.value = jobProfil.textContent;
}; 

function closePopup() {
    popup.classList.remove('popup__opened');
};

function foolproof(){
    if 
    (!nameInput.value) alert('Заполните поле "Имя пользователя"');
    else if 
    (!jobInput.value) alert('Заполните поле "Вид деятельности"');
    else 
    nameProfil.textContent = nameInput.value;
    jobProfil.textContent = jobInput.value;
    closePopup(); 
}
// Обработчик «отправки» формы, она никуда отправляться не будет пока
function formSubmitHandler (evt) {
    evt.preventDefault(); // отмен. станд. отправку формы.   

    foolproof(); 
    closePopup(); 
};


console.log();
btnChangeName.addEventListener('click', openPopup);
btnClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);  
btnSave.addEventListener('click', foolproof);

 
  