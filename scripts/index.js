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
const galleryList = document.querySelector('.gallery__list');
const addCardBtn = document.querySelector('.profile__btn_type_add');
const popupAddCard = document.querySelector('#popup-add-card');
const addCardForm = document.querySelector('#add-card-form');
const inputTitle = addCardForm.querySelector('#title');
const inputLink = addCardForm.querySelector('#link');

// ДЛЯ ОКНА ПРОСМОТРА КАРТИНКИ
const popupViewCardImage = document.querySelector('#popup-view-image');
const popupImage = popupViewCardImage.querySelector('.popup__image');
const popupImageSubtext = popupViewCardImage.querySelector('.popup__image-subtext');

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
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseByEsc);
}

function openEditProfilePopup() {
  openPopup(popupEditProfile);
  editProfileFormValidation.hideValidationErrors();
  editProfileFormValidation.enableButton();

  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function openAddCardPopup() {
  openPopup(popupAddCard);
  addCardForm.reset();
  addCardFormValidation.hideValidationErrors();
}

// -------------------------------
// ФУНКЦИИ ЗАКРЫТИЯ МОДАЛЬНЫХ ОКОН
// -------------------------------
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseByEsc);
}

function handleCloseByEsc(event) {
  if (event.key === 'Escape') {
    const popupElement = document.querySelector('.popup_opened');
    closePopup(popupElement);
  }
}

// ---------------------------------------
// ФУНКЦИЯ СОЗДАНИЯ ЭКЗЕМПЛЯРА КЛАССА CARD
// ---------------------------------------
function createCardInstance(cardData) {
  return new Card(cardData, '#card-template').createCard();
}

// ---------------------
// ФУНКЦИИ САБМИТОВ ФОРМ
// ---------------------
function editProfileFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopup(popupEditProfile);
}

function addCardFormSubmit(event) {
  event.preventDefault();

  const cardData = {
    name: inputTitle.value,
    link: inputLink.value,
  }

  addCardFormValidation.disableButton();
  addCardForm.reset();
  galleryList.prepend(createCardInstance(cardData));

  closePopup(popupAddCard);
}

// ----------------------------------------
// ОТРИСОВКА КАРТОЧЕК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// ----------------------------------------
galleryCards.forEach(item => {
  const cardElement = createCardInstance(item);
  galleryList.prepend(cardElement);
})

// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
editProfileBtn.addEventListener('click', openEditProfilePopup);

// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА ДОБАВЛЕНИЯ КАРТОЧКИ
addCardBtn.addEventListener('click', openAddCardPopup);

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

// ОБРАБОТЧИК САБМИТА ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
editProfileForm.addEventListener('submit', editProfileFormSubmit);

// ОБРАБОТЧИК САБМИТА ФОРМЫ ДОБАВЛЕНИЯ КАРТОЧКИ
addCardForm.addEventListener('submit', addCardFormSubmit)

// ВАЛИДАЦИЯ ФОРМ
editProfileFormValidation.enableValidation();
addCardFormValidation.enableValidation();

export { openPopup, popupViewCardImage, popupImage, popupImageSubtext };
