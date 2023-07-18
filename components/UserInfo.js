export default class UserInfo {
  constructor(userData) {
    this.userData = userData;
    this._userNameSelector = document.querySelector('.profile__name');
    this._userJobSelector = document.querySelector('.profile__job');
  }

  getUserInfo() {
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