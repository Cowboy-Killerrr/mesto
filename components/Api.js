export default class Api {
  constructor({ url, token }) {
    this.url = url;
    this.token = token;
  }

  _getResponseData(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }

    return response.json();
  }

  getUserDataObj() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(response => this._getResponseData(response))
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then(response => this._getResponseData(response))
  }

  editUserInfo(userDataObj) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDataObj)
    })
  }

  editUserAvatar(userAvatarObj) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userAvatarObj)
    })
  }

  addNewCard(cardDataObj) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardDataObj)
    })
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token
      }
    })
      .then(response => this._getResponseData(response))
  }

  likeCard(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.token
      }
    })
      .then(response => this._getResponseData(response))
  }

  unlikeCard(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.token
      }
    })
      .then(response => this._getResponseData(response))
  }
}