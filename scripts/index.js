// ДЛЯ КАРТОЧЕК
const cardsContainer = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card-template');
const cardContent = cardTemplate.content;
const card = cardContent.querySelector('.card');

// СПИСОК МОДАЛЬНЫХ ОКОН
const popupNodeList = document.querySelectorAll('.popup');

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
const submitBtn = addCardForm.querySelector('.form__btn');

// ДЛЯ ОКНА ПРОСМОТРА КАРТИНКИ
const popupViewImage = document.querySelector('#popup-view-image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-subtext');

// -----------------------------
// ДОБАВИТЬ КАРТОЧКУ НА СТРАНИЦУ
// -----------------------------
function addNewCard(card, container) {
  container.prepend(card);
}

// ------------------
// ОТРИСОВКА КАРТОЧЕК
// ------------------
function createCard(cardData) {
  const newCard = card.cloneNode(true);

  const newCardImage = newCard.querySelector('.card__image');
  newCardImage.src = cardData.link;
  newCardImage.alt = cardData.name;

  const newCardTitle = newCard.querySelector('.card__title');
  newCardTitle.textContent = cardData.name;

  // -------------
  // ЛАЙК КАРТОЧКИ
  // -------------
  const likeBtn = newCard.querySelector('.card__like-btn');
  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('card__like-btn_active');
  })

  // -----------------
  // УДАЛЕНИЕ КАРТОЧКИ
  // -----------------
  const deleteBtn = newCard.querySelector('.card__delete-btn');
  deleteBtn.addEventListener('click', () => {
    newCard.remove();
  })

  // --------------------------
  // ПРОСМОТР КАРТИНКИ КАРТОЧКИ
  // --------------------------

  newCardImage.addEventListener('click', () => {
    openPopup(popupViewImage);

    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;

    popupImageTitle.textContent = cardData.name;
  })

  return newCard;
}

// -----------------------
// ОТКРЫТИЕ МОДАЛЬНЫХ ОКОН
// -----------------------
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
  const popupElements = Array.from(document.querySelectorAll('.popup'));
  popupElements.forEach(popup => {
    if (popup.classList.contains('popup_opened') && event.key === 'Escape') {
      closePopup(popup);
    }
  })
}

// ----------------------------------------
// ОТРИСОВКА КАРТОЧЕК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// ----------------------------------------
galleryCards.forEach(item => {
  const newCard = createCard(item);
  addNewCard(newCard, cardsContainer);
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

  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
})

// --------------------------------------------
// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА ДОБАВЛЕНИЯ КАРТОЧКИ
// --------------------------------------------
addCardBtn.addEventListener('click', () => {
  openPopup(popupAddCard);
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

  const newCard = createCard(cardData);

  addCardForm.reset();
  addNewCard(newCard, cardsContainer);
  closePopup(popupAddCard);
  disableButton(submitBtn);
})
