import { openPopup, popupViewCardImage, popupImage, popupImageSubtext } from "./index.js";

export default class Card {
  constructor(data, templateSelector) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector).content
      .querySelector('.card').cloneNode(true);
  }

  _handleCardDelete() {
    this._element.remove();
  }

  _handleCardLike() {
    this._element.querySelector('.card__like-btn').classList.toggle('card__like-btn_active');
  }

  _handleViewCardImage() {
    openPopup(popupViewCardImage);

    popupImage.src = this._cardLink;
    popupImage.alt = this._cardName;
    popupImageSubtext.textContent = this._cardName;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-btn').addEventListener('click', () => {
      this._handleCardLike();
    })

    this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
      this._handleCardDelete();
    })

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleViewCardImage();
    })
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._elementImage = this._element.querySelector('.card__image');
    this._elementImage.src = this._cardLink;
    this._elementImage.alt = this._cardName;

    this._elementName = this._element.querySelector('.card__title');
    this._elementName.textContent = this._cardName;

    return this._element;
  }
}
