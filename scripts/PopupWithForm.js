import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ formSubmitCallback }, popupSelector) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._formElement = this._popupSelector.querySelector('.form');
  }

  _getInputValues() {
    this._inputValues = [];
    this._inputElementsList = Array.from(this._popupSelector.querySelectorAll('.form__input'));

    this._inputElementsList.forEach(inputElement => {
      this._inputValues.push(inputElement.value);
    })

    return this._inputValues;
  }

  setEventListeners() {
    this._popupSelector.addEventListener('click', event => {
      this._classList = event.target.classList;

      if (this._classList.contains('popup_opened') || this._classList.contains('popup__btn_type_close')) {
        this.close();
      }
    });

    document.addEventListener('keydown', this._handleEscClose.bind(this));

    this._formElement.addEventListener('submit', event => {
      this._formSubmitCallback(event, this._getInputValues());
    }, { once: true });

  }

  close() {
    this._popupSelector.classList.remove('popup_opened');

    this._formElement.reset();
  }
}