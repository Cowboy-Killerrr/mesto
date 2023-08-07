// ПОДКЛЮЧЕНИЕ СТИЛЕЙ К СТРАНИЦЕ
import '../pages/index.css';

// КЛАССЫ
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithSubmit from '../components/PopupWithSubmit';
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

// ЭКЗЕМПЛЯРЫ КЛАССА ВАЛИДАЦИИ
const formEditProfileValidation = new FormValidator(formSelectors, formEditProfile);
const formEditAvatarValidation = new FormValidator(formSelectors, formEditAvatar);
const formAddCardValidation = new FormValidator(formSelectors, formAddCard);

// API
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-72',
  token: '4de05b98-5a9e-448b-915c-192900b934bb'
})

// ЭКЗЕМПЛЯР КЛАССА ДАННЫХ ПОЛЬЗОВАТЕЛЯ
const userInfo = new UserInfo();

// ЭКЗЕМПЛЯР КЛАССА СПИСКА КАРОТЧЕК
const cardsList = new Section({
  renderer: (cardObj, userData) => {
    cardsList.addItem( createCardInstance(cardObj, userData) );
  }
}, '#gallery-list')

// ЗАПРОСЫ НА СЕРВЕР
Promise.all([

  api.getUserData(),
  api.getInitialCards()

]).then(dataArray => {
  const userData = dataArray[0];
  const cardsArray = dataArray[1];

  // ПОЛУЧИТЬ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ
  userInfo.setUserInfo(userData);

  // ОТРИСОВКА КАРТОЧЕК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
  cardsList.renderItems(cardsArray, userData);

  // ПОПАП НОВОЙ КАРТОЧКИ
  const popupAddCard = new PopupWithForm({
    formSubmitCallback: (inputListValues) => {
      api.addNewCard(inputListValues)
        .then(newCardData => {
          cardsList.addItem( createCardInstance(newCardData, userData) )
          popupAddCard.close()
        })
        .catch(err => { console.log(err); })
    }
  },'#popup-add-card');

  // ОТКРЫТЬ ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
  buttonAddCard.addEventListener('click', () => {
    popupAddCard.open();
    popupAddCard.changeSubmitButtonText('Создать');

    formAddCardValidation.hideValidationErrors();
    formAddCardValidation.disableButton();
  });
})
  .catch(err => { console.log(err); })

// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const popupEditProfile = new PopupWithForm({
  formSubmitCallback: (inputListValues) => {

    api.editUserInfo( inputListValues )
      .then(() => {
        userInfo.insertUserInfo( inputListValues );
        popupEditProfile.close()
      })
      .catch(err => { console.log(err); })

  }
},'#popup-edit-profile');

// ПОПАП РЕДАКТИРОВАНИЯ АВАТАРКИ
const popupEditAvatar = new PopupWithForm({
  formSubmitCallback: (inputListValues) => {

    api.editUserAvatar(inputListValues)
      .then(() => {
        userInfo.changeUserAvatar(inputListValues.avatar);
      })
      .catch(err => { console.log(err); })

    popupEditAvatar.close()
  }
},'#popup-edit-avatar');

// ПОПАП ПРОСМОТРА КАРТИНКИ
const popupWithImage = new PopupWithImage('#popup-view-image');

// ОТКРЫТЬ ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open();

  formEditProfileValidation.hideValidationErrors();
  formEditProfileValidation.enableButton();

  const currentUserInfo = userInfo.getUserInfo();

  inputName.value = currentUserInfo.name;
  inputJob.value = currentUserInfo.about;
});

// ФУНКЦИЯ СОЗДАНИЯ ЭКЗЕМПЛЯРА КЛАССА CARD
function createCardInstance(cardData, userData) {
  const newCard = new Card(cardData, userData, {
    handleCardClick: () => {

      popupWithImage.open(cardData);

    },
    handleCardLike: (cardData) => {
      if ( newCard.isButtonLikeActive() ) {
        api.unlikeCard(cardData._id)
          .then(cardDataResponse => {
            newCard.setLikesNumber(cardDataResponse)
          })
          .then(() => {
            newCard.setButtonLikeInactive();
          })
      } else {
        api.likeCard(cardData._id)
          .then(cardDataResponse => {
            newCard.setLikesNumber(cardDataResponse)
          })
          .then(() => {
            newCard.setButtonLikeActive()
          })
      }
    },
    handleCardDelete: (cardData) => {
      // ПОПАП УДАЛЕНИЯ КАРТОЧКИ
      const popupDeleteCard = new PopupWithSubmit({

        formSubmitCallback: (event) => {
          event.preventDefault();

          api.deleteCard(cardData._id)
            .catch(err => { console.log(err); })

          newCard.removeCardElement();
          popupDeleteCard.close()
        }

      }, '#popup-delete-card')

      popupDeleteCard.open();
    },
    checkDeleteAccess: () => {
      if (userData._id != cardData.owner._id) {
        newCard.removeButtonDeleteElement();
      }
    }
  }, '#card-template');

  return newCard.createCard();
}

// ОТКРЫТЬ ПОПАП РЕДАКТИРОВАНИЯ АВАТАРКИ
buttonEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open()

  formEditAvatarValidation.hideValidationErrors();
  formEditAvatarValidation.disableButton();
})

// ВАЛИДАЦИЯ ФОРМ
formEditProfileValidation.enableValidation();
formEditAvatarValidation.enableValidation();
formAddCardValidation.enableValidation();



export { api };