// ПОДКЛЮЧЕНИЕ СТИЛЕЙ К СТРАНИЦЕ
import '../pages/index.css';

// КЛАССЫ
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api';

// ДЛЯ ОКНА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const buttonEditProfile = document.querySelector('.profile__btn_type_edit');
const formEditProfile = document.querySelector('#edit-profile-form');
const inputName = formEditProfile.querySelector('#name');
const inputJob = formEditProfile.querySelector('#job');

// ДЛЯ ОКНА РЕДАКТИРОВАНИЯ АВАТВРКИ
const buttonEditAvatar = document.querySelector('.profile__avatar-btn');
const formEditAvatar = document.querySelector('#edit-avatar-form');

// ДЛЯ ОКНА ДОБАВЛЕНИЯ КАРТОЧКИ
const buttonAddCard = document.querySelector('.profile__btn_type_add');
const formAddCard = document.querySelector('#add-card-form');

// СЕЛЕКТОРЫ ДЛЯ ВАЛИДАЦИИ
const formSelectors = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__btn",
  submitButtonDisabled: "form__btn_disabled",
  inputErrorClass: "form__input_state_error",
  inputErrorText: ".form__input-error",
}

// API
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-72',
  token: '4de05b98-5a9e-448b-915c-192900b934bb'
})

Promise.all([

  api.getUserData(),
  api.getInitialCards()

]).then(dataArr => {

  const userData = dataArr[0];
  const cardsArray = dataArr[1];

  // ОТРИСОВКА КАРТОЧЕК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
  const cardsList = new Section({
    renderer: () => {
      cardsArray.forEach(cardObj => {

        cardsList.addItem( createCardInstance(cardObj, userData._id) )

      })
    }
  }, '#gallery-list')

  cardsList.renderItems();

})

// ЭКХЕМПЛЯРЫ КЛАССА ВАЛИДАЦИИ
const formEditProfileValidation = new FormValidator(formSelectors, formEditProfile);
const formEditAvatarValidation = new FormValidator(formSelectors, formEditAvatar);
const formAddCardValidation = new FormValidator(formSelectors, formAddCard);

// ПОЛУЧИТЬ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ
const userInfo = new UserInfo();
userInfo.setUserInfo();

// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const popupEditProfile = new PopupWithForm({
  formSubmitCallback: (event, inputListValues) => {

    event.preventDefault();

    const userData = {
      name: inputListValues[0],
      about: inputListValues[1]
    }

    api.editUserInfo(userData)
      .then(() => {
        userInfo.insertUserInfo( userData );
        popupEditProfile.close()
      })
      .catch(err => { console.log(err); })


  }
},'#popup-edit-profile');

// ПОПАП РЕДАКТИРОВАНИЯ АВАТАРКИ
const popupEditAvatar = new PopupWithForm({
  formSubmitCallback: (event, inputListValues) => {
    event.preventDefault();

    api.editUserAvatar({ avatar: inputListValues[0] })
      .then(() => {
        userInfo.changeUserAvatar(inputListValues[0]);
      })
      .catch(err => { console.log(err); })

    popupEditAvatar.close()
  }
},'#popup-edit-avatar');

// ПОПАП НОВОЙ КАРТОЧКИ
const popupAddCard = new PopupWithForm({
  formSubmitCallback: (event, inputListValues) => {
    event.preventDefault();

    const cardObj = {
      name: inputListValues[0],
      link: inputListValues[1],
    }

    api.addNewCard(cardObj)
      .then(() => {

        cardsList.addItem( createCardInstance(cardObj) )
        popupAddCard.close()

      })
      .catch(err => { console.log(err); })
  }
},'#popup-add-card');

// ПОПАП ПРОСМОТРА КАРТИНКИ
const popupWithImage = new PopupWithImage('#popup-view-image');

// ФУНКЦИЯ СОЗДАНИЯ ЭКЗЕМПЛЯРА КЛАССА CARD
function createCardInstance(cardData, userData) {
  const newCard = new Card(cardData, userData, {
    handleCardClick: () => {

      popupWithImage.open(cardData);

    },
    checkDeleteAccess: (buttonElement) => {
      if (userData._id != cardData.owner._id) {
        buttonElement.remove();
      }
    }
  }, '#card-template').createCard();

  return newCard;
}

// ОТКРЫТЬ ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open();

  formEditProfileValidation.hideValidationErrors();
  formEditProfileValidation.enableButton();

  const currentUserInfo = userInfo.getUserInfo();

  inputName.value = currentUserInfo.name;
  inputJob.value = currentUserInfo.about;
});

// ОТКРЫТЬ ПОПАП РЕДАКТИРОВАНИЯ АВАТАРКИ
buttonEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open()

  formEditProfileValidation.hideValidationErrors();
})

// ОТКРЫТЬ ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
buttonAddCard.addEventListener('click', () => {
  popupAddCard.open();

  formAddCardValidation.hideValidationErrors();
  formAddCardValidation.disableButton();
});

// ВАЛИДАЦИЯ ФОРМ
formEditProfileValidation.enableValidation();
formEditAvatarValidation.enableValidation();
formAddCardValidation.enableValidation();

export { api };