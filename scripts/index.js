// ----------------------------------------
// ОТРИСОВКА КАРТОЧЕК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// ----------------------------------------

const galleryCards = [
  {
    name: 'Вулкан Фудзияма',
    link: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Париж',
    link: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Золотые Ворота',
    link: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80'
  },
  {
    name: 'Мормон Роу',
    link: 'https://images.unsplash.com/photo-1610687660051-9fe41058f9b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80'
  },
  {
    name: 'Озеро Комо',
    link: 'https://images.unsplash.com/photo-1606521276375-5fbc52665c8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Сильверлейк',
    link: 'https://images.unsplash.com/photo-1517438020812-01a8eeb72f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
];

const galleryList = document.querySelector('.gallery__list');
const galleryCardTemplate = document.querySelector('#card-template').content;


galleryCards.forEach(card => {
  const galleryCard = galleryCardTemplate.querySelector('.card').cloneNode(true);
  galleryCard.querySelector('.card__image').src = card.link;
  galleryCard.querySelector('.card__image').alt = card.name;
  galleryCard.querySelector('.card__title').textContent = card.name;
  galleryList.append(galleryCard);
})





// ------------------------------------
// МОДАЛЬНОЕ ОКНО РЕДАТИРОВАНИЯ ПРОФИЛЯ
// ------------------------------------

const profileInputName = document.querySelector('#name');
const profileInputDescription = document.querySelector('#job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileBtnEdit = document.querySelector('.profile__btn_type_edit');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditCloseBtn = popupEdit.querySelector('.popup__btn_type_close');
const popupEditForm = popupEdit.querySelector('.form_type_edit');

function popupEditOpen() {
  popupEdit.classList.add('popup_opened');

  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
}

function popupEditClose() {
  popupEdit.classList.remove('popup_opened');
}

function handleEditFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;

  popupEditClose();
}

profileBtnEdit.addEventListener('click', popupEditOpen);
popupEditCloseBtn.addEventListener('click', popupEditClose);
popupEditForm.addEventListener('submit', handleEditFormSubmit);





// ----------------------------------
// МОДАЛЬНОЕ ОКНО ДОБАВЛЕНИЯ КАРТОЧКИ
// ----------------------------------
const addCardTitleInput = document.querySelector('#title');
const addCardLinkInput = document.querySelector('#link');
const profileBtnAddCard = document.querySelector('.profile__btn_type_add');
const popupAddCard = document.querySelector('.popup_type_add');
const popupAddCardCloseBtn = popupAddCard.querySelector('.popup__btn_type_close');
const popupAddCardForm = popupAddCard.querySelector('.form_type_add-card');

function popupAddCardOpen() {
  popupAddCard.classList.add('popup_opened');
}

function popupAddCardClose() {
  popupAddCard.classList.remove('popup_opened');
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();

  galleryCards.unshift(
    {
      name: addCardTitleInput.value,
      link: addCardLinkInput.value
    }
  )

  const galleryCard = galleryCardTemplate.querySelector('.card').cloneNode(true);
  galleryCard.querySelector('.card__image').src = galleryCards[0].link;
  galleryCard.querySelector('.card__image').alt = galleryCards[0].name;
  galleryCard.querySelector('.card__title').textContent = galleryCards[0].name;
  galleryList.insertBefore(galleryCard, galleryList.firstChild);

  addCardTitleInput.value = '';
  addCardLinkInput.value = '';
  popupAddCardClose();
}

profileBtnAddCard.addEventListener('click', popupAddCardOpen);
popupAddCardCloseBtn.addEventListener('click', popupAddCardClose);
popupAddCardForm.addEventListener('submit', handleAddCardFormSubmit);





// -------------
// ЛАЙК КАРТОЧЕК
// -------------
const cardLikeBtn = document.querySelectorAll('.card__like-btn');

cardLikeBtn.forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('card__like-btn_active')) {
      button.classList.remove('card__like-btn_active');
    } else {
      button.classList.add('card__like-btn_active');
    }
  })
})