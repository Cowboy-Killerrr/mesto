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
const editProfileBtn = document.querySelector('.profile__btn_type_edit');
const editProfileForm = document.querySelector('#edit-profile-form');
const inputName = editProfileForm.querySelector('#name');
const inputJob = editProfileForm.querySelector('#job');

// ДЛЯ ОКНА РЕДАКТИРОВАНИЯ АВАТВРКИ
const editAvatarBtn = document.querySelector('.profile__avatar-btn');
const editAvatarForm = document.querySelector('#edit-avatar-form');

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

// API
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-72',
  token: '4de05b98-5a9e-448b-915c-192900b934bb'
})

// ID ПОЛЬЗОВАТЕЛЯ
const userId = await api.getUserDataObj()
.then(userDataObj => {
  return userDataObj._id;
})

// ЭКХЕМПЛЯРЫ КЛАССА ВАЛИДАЦИИ
const editProfileFormValidation = new FormValidator(formSelectors, editProfileForm);
const editAvatarFormValidation = new FormValidator(formSelectors, editAvatarForm);
const addCardFormValidation = new FormValidator(formSelectors, addCardForm);

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

    api.editUserInfo(userData);

    userInfo.insertUserInfo( userData );

    popupEditProfile.close()
  }
},'#popup-edit-profile');

// ПОПАП РЕДАКТИРОВАНИЯ АВАТАРКИ
const popupEditAvatar = new PopupWithForm({
  formSubmitCallback: (event, inputListValues) => {
    event.preventDefault();

    api.editUserAvatar({ avatar: inputListValues[0] })
      .then(() => {
        document.querySelector('.profile__avatar').src = inputListValues[0];
      })

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

    cardsList.addItem( createCardInstance(cardObj) )

    popupAddCard.close()

  }
},'#popup-add-card');

// ПОПАП ПРОСМОТРА КАРТИНКИ
const popupWithImage = new PopupWithImage('#popup-view-image');

// ОТРИСОВКА КАРТОЧЕК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
const cardsList = new Section({
  renderer: () => {
    api.getInitialCards()
      .then(cardsArray => {
        cardsArray.forEach(cardObj => {

          cardsList.addItem( createCardInstance(cardObj, userId) )

        })
      })
  }
}, '#gallery-list')

cardsList.renderItems();

// ФУНКЦИЯ СОЗДАНИЯ ЭКЗЕМПЛЯРА КЛАССА CARD
function createCardInstance(cardObj, userIdValue) {
  const newCard = new Card(cardObj, {
    handleCardClick: () => {

      popupWithImage.open(cardObj);

    },
    checkDeleteAccess: (buttonElement) => {
      if (userIdValue != cardObj.owner._id) {
        buttonElement.remove();
      }
    },
    setLikeButtonState: (buttonElementClassList) => {
      cardObj.likes.forEach(user => {
        if (user._id === userIdValue) {
          buttonElementClassList.add('card__like-btn_active')
        }
      })
    }
  }, '#card-template').createCard();

  return newCard;
}

// ОТКРЫТЬ ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
editProfileBtn.addEventListener('click', () => {
  popupEditProfile.open();

  editProfileFormValidation.hideValidationErrors();
  editProfileFormValidation.enableButton();

  const currentUserInfo = userInfo.getUserInfo();

  inputName.value = currentUserInfo.name;
  inputJob.value = currentUserInfo.about;
});

// ОТКРЫТЬ ПОПАП РЕДАКТИРОВАНИЯ АВАТАРКИ
editAvatarBtn.addEventListener('click', () => {
  popupEditAvatar.open()

  editProfileFormValidation.hideValidationErrors();
})

// ОТКРЫТЬ ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
addCardBtn.addEventListener('click', () => {
  popupAddCard.open();

  addCardFormValidation.hideValidationErrors();
  addCardFormValidation.disableButton();
});

// ВАЛИДАЦИЯ ФОРМ
editProfileFormValidation.enableValidation();
editAvatarFormValidation.enableValidation();
addCardFormValidation.enableValidation();

export { api };