const popup = document.querySelector('.popup');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const popupButtonClose = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__form');
let nameHTML = document.querySelector('.profile__name');
let positionHTML = document.querySelector('.profile__position');
let userNameInput = document.querySelector('.popup__input-name_type_name');
let userPositionInput = document.querySelector('.popup__input-name_type_position');

profileButtonEdit.addEventListener('click', openPopup);
popupButtonClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

function closePopup() {
  popup.classList.add('popup_hidden');
}

function openPopup() {
  popup.classList.remove('popup_hidden');
  userNameInput.value = nameHTML.textContent;
  userPositionInput.value = positionHTML.textContent;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameHTML.textContent = userNameInput.value;
  positionHTML.textContent = userPositionInput.value;
  closePopup();
}
