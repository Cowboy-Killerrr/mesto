export default class Api {
  constructor({ url, token }) {
    this.url = url;
    this.token = token;
  }

  getUserDataObj() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(`Ошибка: ${response.status}`);
        }

        return response.json();
      })
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(`Ошибка: ${response.status}`);
        }

        return response.json();
      })
  }

  editUserInfo(userDataObj) {
    fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDataObj)
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
    }).then(response => {
      if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
      }

      return response.json();
    });
  }
}