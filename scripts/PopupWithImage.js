import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(cardElement, popupSelector) {
    super(popupSelector);
    this._cardElement = cardElement;

    this._popupImage = this._popupElement.querySelector('.popup__image');
    this._popupImageSubtext = this._popupElement.querySelector('.popup__image-subtext');
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    // this._setEventListeners();

    this._popupImage.src = this._cardElement.querySelector('.card__image').src;
    this._popupImage.alt = this._cardElement.querySelector('.card__image').alt;
    this._popupImageSubtext.textContent = this._cardElement.querySelector('.card__title').textContent;
  }
}