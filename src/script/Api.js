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

  getProfileInfo() {
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

  editProfile() {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist'
      })
    });
  }
}
