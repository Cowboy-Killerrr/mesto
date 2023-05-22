const page = document.querySelector('.page');
const popup = document.querySelector('.popup');
const form = document.querySelector('.form');

const profileBtnEdit = document.querySelector('.profile__btn_type_edit');
const popupBtnClose = popup.querySelector('.popup__btn');

const profileInputName = document.querySelector('#name');
const profileInputDescription = document.querySelector('#job');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');



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

galleryCards.forEach(card => {
  return galleryList.insertAdjacentHTML('beforeend', `
  <li class="gallery__card">
    <img src='${card.link}' alt='${card.name}' class="gallery__card-image">
    <div class="gallery__card-heading">
      <h2 class="gallery__card-title">${card.name}</h2>
      <button type="button" class="gallery__card-btn"></button>
    </div>
  </li>
  `)
})

function popupOpen() {
  popup.classList.add('popup_opened');

  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
}

function popupClose() {
  page.style.overflow = 'visible';
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;

  popupClose();
}


profileBtnEdit.addEventListener('click', popupOpen);
popupBtnClose.addEventListener('click', popupClose);
form.addEventListener('submit', handleFormSubmit);