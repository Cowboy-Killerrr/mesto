export default class UserInfo {
  constructor(userData) {
    this.userData = userData;
  }

  getUserInfo() {
    return this.userData;
  }

  setUserInfo(newUserData) {
    this._userNameSelector = document.querySelector('.profile__name');
    this._userJobSelector = document.querySelector('.profile__job');

    this._userNameSelector.textContent = newUserData.userName;
    this._userJobSelector.textContent = newUserData.userJob;

    this.userData = {
      userName: this._userNameSelector.textContent,
      userJob: this._userJobSelector.textContent
    }

  }
}