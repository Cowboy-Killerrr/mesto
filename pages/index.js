// ПОДКЛЮЧЕНИЕ СТИЛЕЙ К СТРАНИЦЕ
import '../pages/index.css';

// МАССИВ ИЗОБРАЖЕНИЙ
import { galleryCards } from '../scripts/cards.js';

// КЛАССЫ
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

// ДЛЯ ОКНА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
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

let cardList;

// ЭКЗЕМПЛЯРЫ КЛАССОВ
const editProfileFormValidation = new FormValidator(formSelectors, editProfileForm);
const addCardFormValidation = new FormValidator(formSelectors, addCardForm);

const userInfo = new UserInfo(() => { userInfo.getUserInfo() });
userInfo.getUserInfo();

const popupWithImage = new PopupWithImage('#popup-view-image');

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

    cardList.addItem( createCardInstance(cardData) )

    popupAddCard.close();

  }
},'#popup-add-card');

// ОТРИСОВКА КАРТОЧЕК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
function fetchCardData() {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-72/cards', {
    headers: {
      authorization: '4de05b98-5a9e-448b-915c-192900b934bb'
    }
  })
  .then(response => { return response.json() })
}

fetchCardData()
  .then(cardData => {
    cardList = new Section({
      data: cardData,
      renderer: (item) => {

        cardList.addItem( createCardInstance(item) );

      }
    }, '#gallery-list');

    return cardList;
  })
  .then(cardList => {
    cardList.renderItems();
  })

// ФУНКЦИЯ СОЗДАНИЯ ЭКЗЕМПЛЯРА КЛАССА CARD
function createCardInstance(cardData) {
  const newCard = new Card(cardData, { handleCardClick: () => {

    popupWithImage.open(cardData);

  } }, '#card-template').createCard();

  return newCard;
}

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

// ВАЛИДАЦИЯ ФОРМ
editProfileFormValidation.enableValidation();
addCardFormValidation.enableValidation();



