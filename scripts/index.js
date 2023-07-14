// ПОДКЛЮЧЕНИЕ СТИЛЕЙ К СТРАНИЦЕ
import '../pages/index.css';

// МАССИВ ИЗОБРАЖЕНИЙ
import { galleryCards } from './cards.js';

// КЛАССЫ
import Card from './Card';
import FormValidator from './FormValidator';
import Section from './Section';
import PopupWithImage from './PopupWithImage';
import PopupWithForm from './PopupWithForm';

// ДЛЯ ОКНА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editProfileBtn = document.querySelector('.profile__btn_type_edit');
const editProfileForm = document.querySelector('#edit-profile-form');
const inputName = editProfileForm.querySelector('#name');
const inputJob = editProfileForm.querySelector('#job');

// ДЛЯ ОКНА ДОБАВЛЕНИЯ КАРТОЧКИ
const addCardBtn = document.querySelector('.profile__btn_type_add');
const addCardForm = document.querySelector('#add-card-form');

// ДЛЯ ВАЛИДАЦИИ
const formSelectors = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__btn",
  submitButtonDisabled: "form__btn_disabled",
  inputErrorClass: "form__input_state_error",
  inputErrorText: ".form__input-error",
}

// ЭКЗЕМПЛЯРЫ КЛАССОВ
const editProfileFormValidation = new FormValidator(formSelectors, editProfileForm);
const addCardFormValidation = new FormValidator(formSelectors, addCardForm);

// -----------------------
// МОДАЛЬНЫЕ ОКНА С ФОРМОЙ
// -----------------------
const popupEditProfile = new PopupWithForm({
  formSubmitCallback: (event, inputListValues) => {

      event.preventDefault();

      profileName.textContent = inputListValues[0];
      profileJob.textContent = inputListValues[1];

      popupEditProfile.close();

  } },'#popup-edit-profile');

const popupAddCard = new PopupWithForm({
  formSubmitCallback: (event, inputListValues) => {
    event.preventDefault();

    const cardData = {
      name: inputListValues[0],
      link: inputListValues[1],
    }

    const newCard = new Card(cardData, { handleCardClick: (event) => {
      if (event.target.classList.contains('card__image')) {
        const popupWithImage = new PopupWithImage(newCard, '#popup-view-image');
        popupWithImage.open();
      }
    } }, '#card-template').createCard();
    cardList.addItem(newCard);

    popupAddCard.close();

  } },'#popup-add-card');


// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА РЕДАКТИРОВАНИЯ ПРОФИЛЯ

editProfileBtn.addEventListener('click', () => {
  popupEditProfile.open();

  editProfileFormValidation.hideValidationErrors();
  editProfileFormValidation.enableButton();

  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});

addCardBtn.addEventListener('click', () => {
  popupAddCard.open();

  addCardFormValidation.hideValidationErrors();
  addCardFormValidation.disableButton();
});

// ----------------------------------------
// ОТРИСОВКА КАРТОЧЕК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// ----------------------------------------
const cardList = new Section({
  data: galleryCards,
  renderer: (item) => {
    const newCard = new Card(item, { handleCardClick: (event) => {
      if (event.target.classList.contains('card__image')) {
        const popupWithImage = new PopupWithImage(newCard, '#popup-view-image');
        popupWithImage.open();
      }
    } }, '#card-template').createCard();
    cardList.addItem(newCard);
  }
}, '#gallery-list');

cardList.renderItems();

// ВАЛИДАЦИЯ ФОРМ
editProfileFormValidation.enableValidation();
addCardFormValidation.enableValidation();
