export default class UserInfo {
  constructor({ usernameSelector, userinfoSelector, avatarSelector }) {
    this._username = document.querySelector(usernameSelector);
    this._userinfo = document.querySelector(userinfoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // Передача готовых значений из разметки в поля импутов
  getUserInfo() {
    return {
      username: this._username.textContent,
      userinfo: this._userinfo.textContent
    };
  }

  // Передача новых значений инпутов в разметку через объект
  setUserInfo({ username, userinfo }) {
    this._username.textContent = username;
    this._userinfo.textContent = userinfo;
  }

  //Передача новых значений инпутов в разметку
  setAvatarPic(avatarlink) {
    this._avatar.src = avatarlink;
  }
}
