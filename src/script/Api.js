export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ответа сервера! Код ошибки:${res.status} - ${res.statusText}`);
    }
  }

  getProfileInfoFromServer() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(res => this._handleServerResponse(res));
  }

  getCardsFromServer() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    }).then(res => this._handleServerResponse(res));
  }

  editProfileInfo(userInfo) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.position
      })
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }

  /*editAvatarPic(avatarUrl) {
    return fetch(`${this._url}users/me/avatar `, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl.avatar
      })
    }).then(res => {
      return this._handleServerResponse(res);
    });
  }*/
}
