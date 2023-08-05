import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ formSubmitCallback }, popupSelector) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._formElement = this._popupElement.querySelector('.form');
    this._submitButton = this._popupElement.querySelector('.form__btn');
  }

  open() {
    super.open()
    this._formElement.reset();
    this._submitButton.textContent = 'Сохранить';
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputElementsList = Array.from(this._popupElement.querySelectorAll('.form__input'));

    this._inputElementsList.forEach(inputElement => {
      this._inputValues[inputElement.getAttribute('name')] = inputElement.value;
    })

    return this._inputValues;
  }

  _setEventListeners() {
    super._setEventListeners();

    this._formElement.addEventListener('submit', event => {
      event.preventDefault();

      this._formSubmitCallback(this._getInputValues());
      this.changeSubmitButtonText('Сохранение...');
    }, { once: true });
  }

  changeSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }

  close() {
    super.close();
  }
}