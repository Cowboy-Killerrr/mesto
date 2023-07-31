// export default class Api {
//   constructor(url) {
//     this.url = url;
//   }

//   fetchUserInfo() {
//     fetch('https://nomoreparties.co/v1/cohort-72/users/me', {
//       headers: {
//         authorization: '4de05b98-5a9e-448b-915c-192900b934bb'
//       }
//     })
//       .then(response => {
//         if (!response.ok) {
//           return Promise.reject(`Ошибка: ${response.status}`);
//         }

//         return response.json()
//       })
//       .then(userData => {
//         this._userNameSelector.textContent = userData.name;
//         this._userJobSelector.textContent = userData.about;
//         this._userAvatarSelector.src = userData.avatar;
//       })
//       .catch(err => {
//         console.error(err);
//       })
//   }
// }