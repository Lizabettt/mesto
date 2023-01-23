class FormValidator {
  //в конструктор принимаем объект целиком (*не жуя:)
  //и ту форму с которой надо работать в формате переменной)
  constructor(dataObject, activeForm) {
    this._dataObject = dataObject;
    this._activeForm = activeForm; 

    //получаем группу полей с классом popup__input -> делаем массив для метода some
    this._inputList = Array.from(
    this._activeForm.querySelectorAll(this._dataObject.inputFormPopup));
    this._buttonSubmit = this._activeForm.querySelector(this._dataObject.buttonSubmit);
  }
  //метод отображения ошибки
  _showInputError(inputFormPopup, errorMessage) {
    const inputErrorText = this._activeForm.querySelector(
      `.${inputFormPopup.id}-error`
    ); //находим спан с -error
    inputErrorText.classList.add(this._dataObject.errorClassVisible); //делаем спан с ошибкой видимым
    inputErrorText.textContent = errorMessage; // показываем текст ошибки
    inputFormPopup.classList.add(this._dataObject.inputError); //добавляем класс импуту (красную рамку)
  }
  //метод НЕ отображения ошибки
  _hideInputError(inputFormPopup) {
    const inputErrorText = this._activeForm.querySelector(
      `.${inputFormPopup.id}-error`
    );
    inputErrorText.classList.remove(this._dataObject.errorClassVisible); //убираем видимость
    inputErrorText.textContent = "";
    inputFormPopup.classList.remove(this._dataObject.inputError); //убираем красную рамку
  }
  //метод проверки на верность заполнения
  _checkInputValidity(inputFormPopup) {
    if (!inputFormPopup.validity.valid) {
      // не валидны ли введенные данные в инпут?
      this._showInputError(inputFormPopup, inputFormPopup.validationMessage);
    } else {
      this._hideInputError(inputFormPopup); //покажи ошибку
    }
  }
  //метод для не верного ввод данных
  _hasInvalidInput() {
    //перебор массива на правильность ввода данных
    return this._inputList.some((inputFormPopup) => {
      return !inputFormPopup.validity.valid;
    });
  }
  //метод активности кнопки попапа
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._buttonSubmit.disabled = false;
    }
  }
  //метод послуать и сделать)
  _setEventListeners() {
   
    //для неактивного состояния кнопки при открытии попапа -> вызываем тогле...и засовываем туда найденный массив и кнопку
    this._toggleButtonState(this._inputList, this._buttonForm);
    //перебираем массив и для каждого поля выполняем ф-ии в скобках и событии инпут
    this._inputList.forEach((inputFormPopup) => {
      inputFormPopup.addEventListener("input", () => {
        this._checkInputValidity(inputFormPopup);
        this._toggleButtonState(this._inputList, this._buttonForm);
      });
    });
  }

  //публичный метод
  disableSubmitButton() {
    this._buttonSubmit.disabled = true;
  }
  //публичный метод
  enableValidation() {
    this._setEventListeners();
  }
}
export default FormValidator;
