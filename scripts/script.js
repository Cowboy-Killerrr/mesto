const page = document.querySelector('.page');
const popup = document.querySelector('.popup');

const profileBtnEdit = document.querySelector('.proflie__btn-edit');
const popupBtnClose = popup.querySelector('.popup__btn_type_close');
const popupBtnSubmit = popup.querySelector('.form__btn_type_submit');

const profileInputName = document.querySelector('.form__input_type_name');
const profileInputDescription = document.querySelector('.form__input_type_job');

const profileName = document.querySelector('.profile__name-text');
const profileDescription = document.querySelector('.profile__description');

function popupOpen() {
  page.style.overflow = 'hidden';
  popup.classList.add('popup__opened');

  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
}

function popupClose() {
  page.style.overflow = 'visible';
  popup.classList.remove('popup__opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;

  popupClose();
}


profileBtnEdit.addEventListener('click', popupOpen);
popupBtnClose.addEventListener('click', popupClose);
popupBtnSubmit.addEventListener('click', handleFormSubmit);