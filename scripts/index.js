// ПОДКЛЮЧЕНИЕ СТИЛЕЙ К СТРАНИЦЕ
import '../pages/index.css';

// МАССИВ ИЗОБРАЖЕНИЙ
import { galleryCards } from './cards.js';

// КЛАССЫ
import Card from './Card';
import FormValidator from './FormValidator';
import Section from './Section';
import Popup from './Popup';

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
const inputTitle = addCardForm.querySelector('#title');
const inputLink = addCardForm.querySelector('#link');

// ДЛЯ ОКНА ПРОСМОТРА КАРТИНКИ
const popupImage = document.querySelector('.popup__image');
const popupImageSubtext = document.querySelector('.popup__image-subtext');

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

// -------------------------------
// ФУНКЦИИ ОТКРЫТИЯ МОДАЛЬНЫХ ОКОН
// -------------------------------
const popupEditProfile = new Popup('#popup-edit-profile');
const popupAddCard = new Popup('#popup-add-card');
const popupViewCardImage = new Popup('#popup-view-image');

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

  addCardForm.reset();
  addCardFormValidation.hideValidationErrors();
});






function openPopup(popup) {
  // popup.classList.add('popup_opened');
  // document.addEventListener('keydown', handleCloseByEsc);
}

// ----------------------------------------
// ОТРИСОВКА КАРТОЧЕК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// ----------------------------------------
const cardList = new Section({
  data: galleryCards,
  renderer: (item) => {
    const newCard = new Card(item, '#card-template').createCard();
    cardList.addItem(newCard);
  }
}, '#gallery-list');

cardList.renderItems();

// ---------------------
// ФУНКЦИИ САБМИТОВ ФОРМ
// ---------------------
function editProfileFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  popupEditProfile.close();
}

function addCardFormSubmit(event) {
  event.preventDefault();

  const cardData = {
    name: inputTitle.value,
    link: inputLink.value,
  }

  addCardFormValidation.disableButton();
  addCardForm.reset();

  const newCard = new Card(cardData, '#card-template').createCard();
  cardList.addItem(newCard);

  closePopup(popupAddCard);
}

// ОБРАБОТЧИК САБМИТА ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
editProfileForm.addEventListener('submit', editProfileFormSubmit);

// ОБРАБОТЧИК САБМИТА ФОРМЫ ДОБАВЛЕНИЯ КАРТОЧКИ
addCardForm.addEventListener('submit', addCardFormSubmit)

// ВАЛИДАЦИЯ ФОРМ
editProfileFormValidation.enableValidation();
addCardFormValidation.enableValidation();

export { openPopup, popupViewCardImage, popupImage, popupImageSubtext };
