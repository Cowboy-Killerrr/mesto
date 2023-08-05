import PopupWithSubmit from "./PopupWithSubmit";
import { api } from "../pages/index";

export default class Card {
  constructor(
    cardData,
    userData,
    {
      handleCardClick,
      handleCardLike,
      handleCardDelete,
      checkDeleteAccess,
    },
    templateSelector) {

    this._cardData = cardData;
    this._userData = userData;

    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
    this._checkDeleteAccess = checkDeleteAccess;

    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector).content
      .querySelector('.card').cloneNode(true);
  }

  _isLikeButtonActive(buttonElementClassList) {
    return buttonElementClassList.contains('card__like-btn_active') ? true : false
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-btn').addEventListener('click', (event) => {
      this._handleCardLike(event.target, this._cardData);
    })

    this._element.querySelector('.card__delete-btn').addEventListener('click', () => {
      this._handleCardDelete(this._cardData);
    })

    this._element.querySelector('.card__image').addEventListener('click', event => {
      this._handleCardClick(event);
    })
  }

  _setLikesNumber(likesCounter, cardData) {
    if (cardData.likes.length === 0) {
      likesCounter.textContent = '';
    } else {
      likesCounter.textContent = cardData.likes.length;
    }
  }

  _setLikeButtonState(cardData, currentUserId) {
    cardData.likes.forEach(user => {
      if (user._id === currentUserId) {
        this._element.querySelector('.card__like-btn').classList.add('card__like-btn_active')
      }
    })
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._elementImage = this._element.querySelector('.card__image');
    this._elementImage.src = this._cardData.link;
    this._elementImage.alt = this._cardData.name;

    this._elementName = this._element.querySelector('.card__title');
    this._elementName.textContent = this._cardData.name;

    this._setLikesNumber(this._element.querySelector('.card__likes'), this._cardData);
    this._checkDeleteAccess(this._element.querySelector('.card__delete-btn'));
    this._setLikeButtonState(this._cardData, this._userData._id);

    return this._element;
  }
}
