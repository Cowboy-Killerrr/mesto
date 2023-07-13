export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener('click', event => {
      this._classList = event.target.classList;
      if (this._classList.contains('popup_opened') || this._classList.contains('popup__btn_type_close')) {
        this.close();
      }
    });

    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }
}