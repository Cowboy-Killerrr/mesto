import { api } from '../pages/index'

export default class UserInfo {
  constructor() {
    this._userNameSelector = document.querySelector('.profile__name');
    this._userAboutSelector = document.querySelector('.profile__job');
    this._userAvatarSelector = document.querySelector('.profile__avatar');
  }

  getUserInfo() {

    this.userData = {
      name: this._userNameSelector.textContent,
      about: this._userAboutSelector.textContent
    }

    return this.userData;
  }

  setUserInfo(userInfoObj) {
    this._userNameSelector.textContent = userInfoObj.name;
    this._userAboutSelector.textContent = userInfoObj.about;
    this._userAvatarSelector.src = userInfoObj.avatar;
  }

  insertUserInfo(userInfoObj) {
    this._userNameSelector.textContent = userInfoObj.name;
    this._userAboutSelector.textContent = userInfoObj.about;
  }

  changeUserAvatar(link) {
    this._userAvatarSelector.src = link;
  }
}

