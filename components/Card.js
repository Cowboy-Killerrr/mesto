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

    this._element = this._getTemplate();
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector).content
      .querySelector('.card').cloneNode(true);
  }

  _setEventListeners() {
    this._buttonDeleteElement = this._element.querySelector('.card__delete-btn');
    this._buttonLikeElement = this._element.querySelector('.card__like-btn');
    this._likesCounterElement = this._element.querySelector('.card__likes');

    this._buttonLikeElement.addEventListener('click', () => {
      this._handleCardLike(this._cardData);
    })

    this._buttonDeleteElement.addEventListener('click', () => {
      this._handleCardDelete(this._element, this._cardData);
    })

    this._element.querySelector('.card__image').addEventListener('click', event => {
      this._handleCardClick(event);
    })
  }

  _setButtonLikeState(cardData, currentUserId) {
    const isLiked = cardData.likes.some(userLike => {
      return userLike._id === currentUserId
    })

    if (isLiked) {
      this._buttonLikeElement.classList.add('card__like-btn_active')
    }
  }

  setButtonLikeActive() {
    this._buttonLikeElement.classList.add('card__like-btn_active');
  }

  setButtonLikeInactive() {
    this._buttonLikeElement.classList.remove('card__like-btn_active');
  }

  isButtonLikeActive() {
    return this._buttonLikeElement.classList.contains('card__like-btn_active');
  }

  setLikesNumber(cardData) {
    if (cardData.likes.length === 0) {
      this._likesCounterElement.textContent = '';
    } else {
      this._likesCounterElement.textContent = cardData.likes.length;
    }
  }

  removeButtonDeleteElement() {
    this._buttonDeleteElement.remove();
  }

  removeCardElement() {
    this._element.remove();
  }

  createCard() {
    this._setEventListeners();

    this._elementImage = this._element.querySelector('.card__image');
    this._elementImage.src = this._cardData.link;
    this._elementImage.alt = this._cardData.name;

    this._elementName = this._element.querySelector('.card__title');
    this._elementName.textContent = this._cardData.name;

    this.setLikesNumber(this._cardData);
    this._checkDeleteAccess(this._buttonDeleteElement);
    this._setButtonLikeState(this._cardData, this._userData._id);

    return this._element;
  }
}
