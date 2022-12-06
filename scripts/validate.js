//создадим массив с данными из форм
const collectionForValidation = {
    formPopup: '.popup__form',
    inputFormPopup: '.popup__input',
    popupBtn: '.popup__btn',
    inputError: 'popup__input_type_error',
    errorClassVisible: 'popup__error_visible',
    btnInactive: 'popup__btn_inactive'
};

// покажем ошибку
const showInputError = (formPopup, inputFormPopup, errorMessage, collectionForValidation) => {
    const  inputErrorText = formPopup.querySelector(`.${inputFormPopup.id}-error`); //находим спан с -error //убрать из функции
    inputFormPopup.classList.add(collectionForValidation.inputError);//добавляем класс импуту (красную рамку)
    inputErrorText.classList.add(collectionForValidation.errorClassVisible); //делаем спан с ошибкой видимым   
    inputErrorText.textContent = errorMessage;                                      
                       
};

 //уберем ошибку 
const hideInputError = (formPopup, inputFormPopup, collectionForValidation) => {
    const  inputErrorText = formPopup.querySelector(`.${inputFormPopup.id}-error`); //находим спан с -error //убрать из функции
    inputFormPopup.classList.remove(collectionForValidation.inputError);                      
    inputErrorText.classList.remove(collectionForValidation.errorClassVisible);                    
    inputErrorText.textContent = '';                                                 
  };

//проверка на валидацию
  const checkInputValidity = (formPopup, inputFormPopup, collectionForValidation) => {
    if (!inputFormPopup.validity.valid) { // валидны ли введенные данные в инпут                                            
       showInputError(formPopup, inputFormPopup, inputFormPopup.validationMessage, collectionForValidation);    
    } else {
      hideInputError(formPopup, inputFormPopup, collectionForValidation); //покажи ошибку
    }
  };
    
//не верный ввод данных
function hasInvalidInput(inputList){
    return inputList.some((inputFormPopup) => {
        return !inputFormPopup.validity.valid; //перебор массива на правильность ввода данных
});
};
    
//активность кнопки попапа  
  const toggleButtonState = (inputList, btnPopup, collectionForValidation) => {
  if (hasInvalidInput(inputList)) { 
     btnPopup.setAttribute('disabled', true); //заблокированна кнопка          
     btnPopup.classList.add(collectionForValidation.btnInactive); //визуально не активна  
  } else {
    btnPopup.removeAttribute('disabled');
    btnPopup.classList.remove(collectionForValidation.btnInactive); 
  } 
  }; 

//обработка формы 
function setEventListeners(formPopup, collectionForValidation) {
    //получаем группу полей с классом popup__input -> делаем массив для метода some
    const inputList = Array.from(formPopup.querySelectorAll(collectionForValidation.inputFormPopup));
    const btnPopup = formPopup.querySelector(collectionForValidation.popupBtn);
    //для неактивного состояния кнопки при открытии попапа -> вызываем тогле...и засовываем туда найденный массив и кнопку
    toggleButtonState(inputList, btnPopup, collectionForValidation); 
    //перебираем массив и для каждого поля выполняем ф-ии в скобках и событии инпут
    inputList.forEach((inputFormPopup) => {
        inputFormPopup.addEventListener('input', function () {
        checkInputValidity(formPopup, inputFormPopup, collectionForValidation);
        toggleButtonState(inputList, btnPopup, collectionForValidation);
      });
    });
  };
//форма
function enableValidation(collectionForValidation) {
    //создаем массив всех элементов с классом '.popup__form'
    const formList = Array.from(document.querySelectorAll(collectionForValidation.formPopup));
    //перебираем формы и добавляем обработчик
    formList.forEach((formPopup) => {
       setEventListeners(formPopup, collectionForValidation); //обработай форму
      });
  };

  enableValidation(collectionForValidation); //данные берутся из массива
  

