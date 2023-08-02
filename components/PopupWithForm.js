import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ formSubmitCallback }, popupSelector) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._formElement = this._popupElement.querySelector('.form');
    this._submitButton = this._popupElement.querySelector('.form__btn');
  }

  _getInputValues() {
    this._inputValues = [];
    this._inputElementsList = Array.from(this._popupElement.querySelectorAll('.form__input'));

    this._inputElementsList.forEach(inputElement => {
      this._inputValues.push(inputElement.value);
    })

    return this._inputValues;
  }

  _setEventListeners() {
    super._setEventListeners();

    this._formElement.addEventListener('submit', event => {
      this._formSubmitCallback(event, this._getInputValues());
    }, { once: true });
  }

  _changeSubmitButtonText() {
    this._submitButton.textContent = 'Сохранение...';
  }

  close() {
    super.close();

    this._changeSubmitButtonText();

    this._formElement.reset();
  }
}