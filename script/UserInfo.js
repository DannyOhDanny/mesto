export default class UserInfo {
  constructor({ usernameSelector, userinfoSelector }) {
    this._username = document.querySelector(usernameSelector);
    this._userinfo = document.querySelector(userinfoSelector);
  }
  // Передача готовых значений из разметки в поля импутов(работает)
  getUserInfo = () => {
    return {
      username: this._username.textContent,
      userinfo: this._userinfo.textContent
    };
  };
  //передача новых значений инпутов в разметку(не работает)
  setUserInfo = ({ username, userinfo }) => {
    this._username.textContent = username;
    this._userinfo.textContent = userinfo;
  };
}
