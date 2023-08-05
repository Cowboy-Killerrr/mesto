import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImage = this._popupElement.querySelector('.popup__image');
    this._popupImageSubtext = this._popupElement.querySelector('.popup__image-subtext');
  }

  open({ name, link }) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageSubtext.textContent = name;

    super.open();
  }
}