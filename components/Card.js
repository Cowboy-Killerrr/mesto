import PopupWithSubmit from "./PopupWithSubmit";
import { api } from "../pages/index";

export default class Card {
  constructor(data, { handleCardClick, checkDeleteAccess }, templateSelector) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._checkDeleteAccess = checkDeleteAccess;
    this._templateSelector = templateSelector;

    this.popupDeleteCard = new PopupWithSubmit({

      formSubmitCallback: (event) => {
        event.preventDefault();

        api.deleteCard(data._id);

        this._element.remove();
        this.popupDeleteCard.close()
      }

    }, '#popup-delete-card')
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector).content
      .querySelector('.card').cloneNode(true);
  }

  _handleCardDelete() {
    this.popupDeleteCard.open();
  }

  _handleCardLike() {
    this._element.querySelector('.card__like-btn').classList.toggle('card__like-btn_active');
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-btn').addEventListener('click', () => {
      this._handleCardLike();
    })

    this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
      this._handleCardDelete();
    })

    this._element.querySelector('.card__image').addEventListener('click', event => {
      this._handleCardClick(event);
    })
  }

  _setLikesNumber(likesCounter, data) {
    if (data.likes.length === 0) {
      likesCounter.textContent = '';
    } else {
      likesCounter.textContent = data.likes.length;
    }
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._elementImage = this._element.querySelector('.card__image');
    this._elementImage.src = this._data.link;
    this._elementImage.alt = this._data.name;

    this._elementName = this._element.querySelector('.card__title');
    this._elementName.textContent = this._data.name;

    this._setLikesNumber(this._element.querySelector('.card__likes'), this._data);
    this._checkDeleteAccess(this._element.querySelector('.card__delete-btn'));

    return this._element;
  }
}
