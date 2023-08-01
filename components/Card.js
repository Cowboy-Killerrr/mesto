import PopupWithSubmit from "./PopupWithSubmit";



export default class Card {
  constructor(data, { handleCardClick }, templateSelector) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardLikes = data.likes;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;

    this.popupDeleteCard = new PopupWithSubmit({

      formSubmitCallback: (event) => {
        event.preventDefault();

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

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._elementImage = this._element.querySelector('.card__image');
    this._elementImage.src = this._cardLink;
    this._elementImage.alt = this._cardName;

    this._elementName = this._element.querySelector('.card__title');
    this._elementName.textContent = this._cardName;

    this._elementLikes = this._element.querySelector('.card__likes');
    if (this._cardLikes.length === 0) {
      this._elementLikes.textContent = '';
    } else {
      this._elementLikes.textContent = this._cardLikes.length;
    }

    return this._element;
  }
}
