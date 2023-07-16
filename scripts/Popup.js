export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);

    this._popupCloseHandler = this._handlePopupClose.bind(this);
    this._popupEscCloseHandler = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    this._setEventListeners();
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    this._popupElement.removeEventListener('click', this._popupCloseHandler);
    document.removeEventListener('keydown', this._popupEscCloseHandler);
  }

  _handlePopupClose(event) {
    this._classList = event.target.classList;

    if (this._classList.contains('popup_opened') || this._classList.contains('popup__btn_type_close')) {
      this.close();
    }
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _setEventListeners() {
    this._popupElement.addEventListener('click', this._popupCloseHandler);

    document.addEventListener('keydown', this._popupEscCloseHandler);
  }
}