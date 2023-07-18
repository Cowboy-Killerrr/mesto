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
import UserInfo from './UserInfo';

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

// СЕЛЕКТОРЫ ДЛЯ ВАЛИДАЦИИ
const formSelectors = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__btn",
  submitButtonDisabled: "form__btn_disabled",
  inputErrorClass: "form__input_state_error",
  inputErrorText: ".form__input-error",
}

// ЭКЗЕМПЛЯРЫ КЛАССОВ ДЛЯ ВАЛИДАЦИИ
const editProfileFormValidation = new FormValidator(formSelectors, editProfileForm);
const addCardFormValidation = new FormValidator(formSelectors, addCardForm);

// ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
const userInfo = new UserInfo(() => { userInfo.getUserInfo() });

const popupWithImage = new PopupWithImage('#popup-view-image');

function createCardInstance(cardData) {
  const newCard = new Card(cardData, { handleCardClick: () => {

    popupWithImage.open(cardData);

  } }, '#card-template').createCard();
  cardList.addItem(newCard);
}



// МОДАЛЬНЫЕ ОКНА С ФОРМОЙ
const popupEditProfile = new PopupWithForm({
  formSubmitCallback: (event, inputListValues) => {

      event.preventDefault();

      userInfo.setUserInfo({
        userName: inputListValues[0],
        userJob: inputListValues[1]
      })

      popupEditProfile.close();

  }
},'#popup-edit-profile');

const popupAddCard = new PopupWithForm({
  formSubmitCallback: (event, inputListValues) => {
    event.preventDefault();

    const cardData = {
      name: inputListValues[0],
      link: inputListValues[1],
    }

    createCardInstance(cardData);

    popupAddCard.close();

  }
},'#popup-add-card');


// ОТКРЫТИЕ МОДАЛЬНЫХ ОКОН
editProfileBtn.addEventListener('click', () => {
  popupEditProfile.open();

  editProfileFormValidation.hideValidationErrors();
  editProfileFormValidation.enableButton();

  const currentUserInfo = userInfo.getUserInfo();

  inputName.value = currentUserInfo.userName;
  inputJob.value = currentUserInfo.userJob;
});

addCardBtn.addEventListener('click', () => {
  popupAddCard.open();

  addCardFormValidation.hideValidationErrors();
  addCardFormValidation.disableButton();
});

// ОТРИСОВКА КАРТОЧЕК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
const cardList = new Section({
  data: galleryCards,
  renderer: (item) => {
    createCardInstance(item);
  }
}, '#gallery-list');

cardList.renderItems();

// ВАЛИДАЦИЯ ФОРМ
editProfileFormValidation.enableValidation();
addCardFormValidation.enableValidation();