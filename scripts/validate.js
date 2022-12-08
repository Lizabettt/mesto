//создадим массив с данными из форм
const validationConfig = {
  formPopup: ".popup__form",
  inputFormPopup: ".popup__input",
  buttonSubmit: ".popup__btn",
  inputError: "popup__input_type_error",
  errorClassVisible: "popup__error_visible",
};

// покажем ошибку
const showInputError = (
  formPopup,
  inputFormPopup,
  errorMessage,
  validationConfig
) => {
  const inputErrorText = formPopup.querySelector(`.${inputFormPopup.id}-error`); //находим спан с -error //убрать из функции
  inputFormPopup.classList.add(validationConfig.inputError); //добавляем класс импуту (красную рамку)
  inputErrorText.classList.add(validationConfig.errorClassVisible); //делаем спан с ошибкой видимым
  inputErrorText.textContent = errorMessage;
};

//уберем ошибку
const hideInputError = (formPopup, inputFormPopup, validationConfig) => {
  const inputErrorText = formPopup.querySelector(`.${inputFormPopup.id}-error`); //находим спан с -error //убрать из функции
  inputFormPopup.classList.remove(validationConfig.inputError);
  inputErrorText.classList.remove(validationConfig.errorClassVisible);
  inputErrorText.textContent = "";
};

//проверка на валидацию
const checkInputValidity = (formPopup, inputFormPopup, validationConfig) => {
  if (!inputFormPopup.validity.valid) {
    // валидны ли введенные данные в инпут
    showInputError(
      formPopup,
      inputFormPopup,
      inputFormPopup.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formPopup, inputFormPopup, validationConfig); //покажи ошибку
  }
};

//не верный ввод данных
function hasInvalidInput(inputList) {
  return inputList.some((inputFormPopup) => {
    return !inputFormPopup.validity.valid; //перебор массива на правильность ввода данных
  });
};

//активность кнопки попапа
const toggleButtonState = (inputList, buttonSubmit) => {
  if (hasInvalidInput(inputList)) {
    buttonSubmit.disabled = true;
  } else {
    buttonSubmit.disabled = false;
  }
};

//обработка формы
function setEventListeners(formPopup, validationConfig) {
  //получаем группу полей с классом popup__input -> делаем массив для метода some
  const inputList = Array.from(
    formPopup.querySelectorAll(validationConfig.inputFormPopup)
  );
  const buttonSubmit = formPopup.querySelector(validationConfig.buttonSubmit);
  //для неактивного состояния кнопки при открытии попапа -> вызываем тогле...и засовываем туда найденный массив и кнопку
  toggleButtonState(inputList, buttonSubmit);
  //перебираем массив и для каждого поля выполняем ф-ии в скобках и событии инпут
  inputList.forEach((inputFormPopup) => {
    inputFormPopup.addEventListener("input", function () {
      checkInputValidity(formPopup, inputFormPopup, validationConfig);
      toggleButtonState(inputList, buttonSubmit);
    });
  });
};

//форма
function enableValidation(validationConfig) {
  //создаем массив всех элементов с классом '.popup__form'
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formPopup)
  );
  //перебираем формы и добавляем обработчик
  formList.forEach((formPopup) => {
    setEventListeners(formPopup, validationConfig); //обработай форму
  });
};

enableValidation(validationConfig); //данные берутся из массива
