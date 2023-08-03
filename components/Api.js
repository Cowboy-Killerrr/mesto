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
      .catch((err) => {
        console.log(err);
      });
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
      .catch((err) => {
        console.log(err);
      });
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
      .catch((err) => {
        console.log(err);
      });
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
      .catch((err) => {
        console.log(err);
      });
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
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
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
      .catch((err) => {
        console.log(err);
      });
  }

  likeCard(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'PUT',
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
      .catch((err) => {
        console.log(err);
      });
  }

  unlikeCard(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'DELETE',
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
      .catch((err) => {
        console.log(err);
      });
  }
}