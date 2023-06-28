// КЛАССЫ
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// СПИСОК МОДАЛЬНЫХ ОКОН
const popupNodeList = Array.from(document.querySelectorAll('.popup'));

// ДЛЯ ОКНА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editProfileBtn = document.querySelector('.profile__btn_type_edit');
const popupEditProfile = document.querySelector('#popup-edit-profile');
const editProfileForm = document.querySelector('#edit-profile-form');
const inputName = editProfileForm.querySelector('#name');
const inputJob = editProfileForm.querySelector('#job');

// ДЛЯ ОКНА ДОБАВЛЕНИЯ КАРТОЧКИ
const addCardBtn = document.querySelector('.profile__btn_type_add');
const popupAddCard = document.querySelector('#popup-add-card');
const addCardForm = document.querySelector('#add-card-form');
const inputTitle = addCardForm.querySelector('#title');
const inputLink = addCardForm.querySelector('#link');
const cardFormSubmitBtn = addCardForm.querySelector('.form__btn');

// ДЛЯ ОКНА ПРОСМОТРА КАРТИНКИ
const popupViewImage = document.querySelector('#popup-view-image');

// ДЛЯ ВАЛИДАЦИИ
const formSelectors = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__btn",
  inputErrorClass: "form__input_state_error",
  inputErrorText: ".form__input-error",
}

// ЭКЗЕМПЛЯРЫ КЛАССОВ
const editProfileFormValidation = new FormValidator(formSelectors, editProfileForm);
const addCardFormValidation = new FormValidator(formSelectors, addCardForm);

// -------------------------------
// ФУНКЦИЯ ОТКРЫТИЯ МОДАЛЬНЫХ ОКОН
// -------------------------------
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseByEsc);
}

// -------------------------------
// ФУНКЦИЯ ЗАКРЫТИЯ МОДАЛЬНЫХ ОКОН
// -------------------------------
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseByEsc);
}

// ----------------------------------------------
// ФУНКЦИЯ ЗАКРЫТИЯ МОДАЛЬНЫХ ОКОН ПО НАЖАТИЮ ESC
// ----------------------------------------------

function handleCloseByEsc(event) {
  if (event.key === 'Escape') {
    const popupElement = document.querySelector('.popup_opened');
    closePopup(popupElement);
  }
}

// ----------------------------------------
// ОТРИСОВКА КАРТОЧЕК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// ----------------------------------------
galleryCards.forEach(item => {
  const card = new Card(item, '#card-template');
  const cardElement = card.createCard();

  document.querySelector('.gallery__list').prepend(cardElement);
})

// -----------------------------------------------
// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
// -----------------------------------------------
editProfileBtn.addEventListener('click', () => {
  openPopup(popupEditProfile);
  editProfileFormValidation.hideValidationErrors();
  editProfileFormValidation.enableButton();

  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
})

// --------------------------------------------
// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА ДОБАВЛЕНИЯ КАРТОЧКИ
// --------------------------------------------
addCardBtn.addEventListener('click', () => {
  openPopup(popupAddCard);
  addCardForm.reset();
  addCardFormValidation.hideValidationErrors();
})

// ------------------------
// ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
// ------------------------
popupNodeList.forEach(popup => {
  popup.addEventListener('click', event => {
    const elementClassList = event.target.classList;
    if (elementClassList.contains('popup') || elementClassList.contains('popup__btn_type_close')) {
      closePopup(popup);
    }
  })
})

// -----------------------------------------------
// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
// -----------------------------------------------
editProfileBtn.addEventListener('click', () => {
  openPopup(popupEditProfile);
  hideValidationErrors(editProfileForm);

  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
})

// --------------------------------------------
// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА ДОБАВЛЕНИЯ КАРТОЧКИ
// --------------------------------------------
addCardBtn.addEventListener('click', () => {
  openPopup(popupAddCard);
  hideValidationErrors(addCardForm);

  addCardForm.reset();
})

// ----------------------------
// ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
// ----------------------------
editProfileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopup(popupEditProfile);
})

// -------------------------
// ФОРМА ДОБАВЛЕНИЯ КАРТОЧКИ
// -------------------------
addCardForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const cardData = {
    name: inputTitle.value,
    link: inputLink.value,
  }

  const card = new Card(cardData, '#card-template');
  const cardElement = card.createCard();

  document.querySelector('.gallery__list').prepend(cardElement);

  addCardForm.reset();
  closePopup(popupAddCard);
  addCardFormValidation.disableButton();
})

editProfileFormValidation.enableValidation();
addCardFormValidation.enableValidation();

export { openPopup, popupViewImage };
