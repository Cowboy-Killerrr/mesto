export default class UserInfo {
  constructor(userData) {
    this.userData = userData;
    this._userNameSelector = document.querySelector('.profile__name');
    this._userJobSelector = document.querySelector('.profile__job');
    this._userAvatarSelector = document.querySelector('.profile__avatar');
  }

  _fetchUserInfo() {
    fetch('https://nomoreparties.co/v1/cohort-72/users/me', {
      headers: {
        authorization: '4de05b98-5a9e-448b-915c-192900b934bb'
      }
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(`Ошибка: ${response.status}`);
        }

        return response.json()
      })
      .then(userData => {
        this._userNameSelector.textContent = userData.name;
        this._userJobSelector.textContent = userData.about;
        this._userAvatarSelector.src = userData.avatar;
      })
      .catch(err => {
        console.error(err);
      })
  }

  getUserInfo() {
    this._fetchUserInfo();

    this.userData = {
      userName: this._userNameSelector.textContent,
      userJob: this._userJobSelector.textContent
    }

    return this.userData;
  }

  setUserInfo(newUserData) {
    this._userNameSelector.textContent = newUserData.userName;
    this._userJobSelector.textContent = newUserData.userJob;
  }
}