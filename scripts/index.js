const page = document.querySelector('.page');



// -----------------------------------------------
// РЕНДЕР КАРТОЧЕК В GALLERY ПРИ ОТКРЫТИИ СТРАНИЦЫ
// -----------------------------------------------
const galleryCards = [
  {
    name: 'Вулкан Фудзияма',
    link: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Эйфелева Башня',
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
const galleryCardTemplate = document.querySelector('#gallery__card-template').content;

galleryCards.forEach(card => {
  const galleryCard = galleryCardTemplate.querySelector('.gallery__card').cloneNode(true);
  galleryCard.querySelector('.gallery__card-image').src = card.link;
  galleryCard.querySelector('.gallery__card-image').alt = card.name;
  galleryCard.querySelector('.gallery__card-title').textContent = card.name;
  galleryList.append(galleryCard);
})



// -------------------------------------
// МОДАЛЬНОЕ ОКНО РЕДАКТИРОВАНИЯ ПРОФИЛЯ
// -------------------------------------

const profileBtnEdit = document.querySelector('.profile__btn_type_edit');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupTemplate = document.querySelector('#popup').content;
const popupEdit = popupTemplate.querySelector('.popup');
const popupBtnClose = popupEdit.querySelector('.popup__btn_type_close');
const editProfileForm = popupEdit.querySelector('.form');
const popupEditInputs = popupEdit.querySelectorAll('.form__input');


function popupEditOpen() {
  popupEdit.cloneNode(true);
  popupEdit.classList.add('popup_opened');

  popupEdit.querySelector('.popup__title').textContent = 'Редактировать профиль';
  popupEdit.querySelector('.form').name = 'edit-profile-form';
  popupEdit.querySelector('.form__btn').textContent = 'Сохранить';

  const popupEditInputName = popupEditInputs[0];
  popupEditInputName.name = 'name';
  popupEditInputName.id = '#name';
  popupEditInputName.placeholder = 'Имя';
  popupEditInputName.value = profileName.textContent;

  const popupEditInputJob = popupEditInputs[1];
  popupEditInputJob.name = 'job';
  popupEditInputJob.id = '#job';
  popupEditInputJob.placeholder = 'Род деятельности';
  popupEditInputJob.value = profileDescription.textContent;

  page.append(popupEdit);
}

function popupEditClose() {
  popupEdit.classList.remove('popup_opened');
  page.removeChild(popupEdit);
}

function editFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = popupEditInputs[0].value;
  profileDescription.textContent = popupEditInputs[1].value;

  popupEditClose();
}

profileBtnEdit.addEventListener('click', popupEditOpen);
popupBtnClose.addEventListener('click', popupEditClose);
editProfileForm.addEventListener('submit', editFormSubmit);



