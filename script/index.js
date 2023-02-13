const editPopup = document.querySelector('.popup');
const profileButtonEdit = document.querySelector('.profile__button-edit');

profileButtonEdit.addEventListener('click', function () {
  const editPopup = document.querySelector('.popup');
  editPopup.classList.remove('popup_hidden');
});

const popupCloseButton = document.querySelector('.popup__button-close');
popupCloseButton.addEventListener('click', function () {
  editPopup.classList.add('popup_hidden');
});

let user = {
  name: 'Жак-Ив Кусто',
  position: 'Исследователь океана'
};

const userName = document.querySelector('.profile__name');
userName.textContent = user.name;

const userPosition = document.querySelector('.profile__position');
userPosition.textContent = user.position;

const userNameInput = document.querySelector('.popup__input-name_type_name');
userNameInput.value = user.name;

const userPositionInput = document.querySelector('.popup__input-name_type_position');
userPositionInput.value = user.position;

const savePopupButton = document.querySelector('.popup__button-save');

/* Предыдущий вариант без выхода из окна после ввода данных

savePopupButton.addEventListener('click', function (event) {
  if (!userPositionInput.value) {
    throw new Error('Имя не введено!');
  } else {
    const value = userNameInput.value;
    userName.textContent = value;
  }
});

savePopupButton.addEventListener('click', function (event) {
  if (!userPositionInput.value) {
    throw new Error('Должность не введена!');
  } else {
    const value = userPositionInput.value;
    userPosition.textContent = value;
  }
});
*/

savePopupButton.addEventListener('click', function (event) {
  if (!userNameInput.value || !userPositionInput.value) {
    throw new Error('Данные не введены!');
  } else {
    const nameValue = userNameInput.value;
    userName.textContent = nameValue;

    const positionValue = userPositionInput.value;
    userPosition.textContent = positionValue;

    editPopup.classList.add('popup_hidden');
  }
});
