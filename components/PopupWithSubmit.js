import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor({ formSubmitCallback }, popupSelector, cardToDelete) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._formElement = this._popupElement.querySelector('.form');
  }

  _setEventListeners() {
    super._setEventListeners();

    this._formElement.addEventListener('submit', event => {
      this._formSubmitCallback(event)
    }, { once: true })
  }
}