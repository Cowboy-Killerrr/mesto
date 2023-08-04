import PopupWithSubmit from "./PopupWithSubmit";
import { api } from "../pages/index";

export default class Card {
  constructor(cardData, userData, { handleCardClick, checkDeleteAccess }, templateSelector) {
    this._cardData = cardData;
    this._userData = userData;

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

  _isLikeButtonActive(buttonElementClassList) {
    return buttonElementClassList.contains('card__like-btn_active') ? true : false
  }

  _handleCardLike() {
    this._likeButtonClassList = this._element.querySelector('.card__like-btn').classList;

    if ( this._isLikeButtonActive(this._likeButtonClassList) ) {

      this._likeButtonClassList.remove('card__like-btn_active');
      api.unlikeCard(this._cardData._id)
        .then(response => {
          this._setLikesNumber(this._element.querySelector('.card__likes'), response);
        })

    } else {

      this._likeButtonClassList.add('card__like-btn_active');
      api.likeCard(this._cardData._id)
        .then(response => {
          this._setLikesNumber(this._element.querySelector('.card__likes'), response);
        })

    }
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
    this._setLikeButtonState(this._cardData, this._userData);

    return this._element;
  }
}
