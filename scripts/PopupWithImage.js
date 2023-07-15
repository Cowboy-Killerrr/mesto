import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(cardElement, popupSelector) {
    super(popupSelector);
    this._cardElement = cardElement;

    this._popupImage = this._popupSelector.querySelector('.popup__image');
    this._popupImageSubtext = this._popupSelector.querySelector('.popup__image-subtext');
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    this.setEventListeners();

    this._popupImage.src = this._cardElement.querySelector('.card__image').src;
    this._popupImage.alt = this._cardElement.querySelector('.card__image').alt;
    this._popupImageSubtext.textContent = this._cardElement.querySelector('.card__title').textContent;
  }
}