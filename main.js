(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,n){for(var r=0;r<n.length;r++){var o=n[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,n){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===t(i)?i:String(i)),o)}var i}var n=function(){function t(e,n,r,o){var i=r.handleCardClick,u=r.handleCardLike,a=r.handleCardDelete,c=r.checkDeleteAccess;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._cardData=e,this._userData=n,this._handleCardClick=i,this._handleCardLike=u,this._handleCardDelete=a,this._checkDeleteAccess=c,this._templateSelector=o,this._element=this._getTemplate()}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(!0)}},{key:"_setEventListeners",value:function(){var t=this;this._buttonDeleteElement=this._element.querySelector(".card__delete-btn"),this._buttonLikeElement=this._element.querySelector(".card__like-btn"),this._likesCounterElement=this._element.querySelector(".card__likes"),this._buttonLikeElement.addEventListener("click",(function(){t._handleCardLike(t._cardData)})),this._buttonDeleteElement.addEventListener("click",(function(){t._handleCardDelete(t._element,t._cardData)})),this._element.querySelector(".card__image").addEventListener("click",(function(e){t._handleCardClick(e)}))}},{key:"_setButtonLikeState",value:function(t,e){t.likes.some((function(t){return t._id===e}))&&this._buttonLikeElement.classList.add("card__like-btn_active")}},{key:"setButtonLikeActive",value:function(){this._buttonLikeElement.classList.add("card__like-btn_active")}},{key:"setButtonLikeInactive",value:function(){this._buttonLikeElement.classList.remove("card__like-btn_active")}},{key:"isButtonLikeActive",value:function(){return this._buttonLikeElement.classList.contains("card__like-btn_active")}},{key:"setLikesNumber",value:function(t){0===t.likes.length?this._likesCounterElement.textContent="":this._likesCounterElement.textContent=t.likes.length}},{key:"removeButtonDeleteElement",value:function(){this._buttonDeleteElement.remove()}},{key:"removeCardElement",value:function(){this._element.remove()}},{key:"createCard",value:function(){return this._setEventListeners(),this._elementImage=this._element.querySelector(".card__image"),this._elementImage.src=this._cardData.link,this._elementImage.alt=this._cardData.name,this._elementName=this._element.querySelector(".card__title"),this._elementName.textContent=this._cardData.name,this.setLikesNumber(this._cardData),this._checkDeleteAccess(this._buttonDeleteElement),this._setButtonLikeState(this._cardData,this._userData._id),this._element}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,i=function(t,e){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===r(i)?i:String(i)),o)}var i}var i=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._formSelector=e.formSelector,this._inputSelector=e.inputSelector,this._submitButtonSelector=n.querySelector(e.submitButtonSelector),this._submitButtonDisabled=e.submitButtonDisabled,this._inputErrorClass=e.inputErrorClass,this._inputErrorText=e.inputErrorText,this._formElement=n}var e,n;return e=t,(n=[{key:"_showInputError",value:function(t){this._errorElement=this._formElement.querySelector(".".concat(t.id,"-input-error")),t.classList.add(this._inputErrorClass),this._errorElement.textContent=t.validationMessage}},{key:"_hideInputError",value:function(t){this._errorElement=this._formElement.querySelector(".".concat(t.id,"-input-error")),t.classList.remove(this._inputErrorClass),this._errorElement.textContent=""}},{key:"_checkInputValidity",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t)}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this.disableButton():this.enableButton()}},{key:"_hasInvalidInput",value:function(){return this._inputsList.some((function(t){return!t.validity.valid}))}},{key:"_setEventListeners",value:function(){var t=this;this._inputsList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._inputsList.forEach((function(e){e.addEventListener("input",(function(){t._checkInputValidity(e),t._toggleButtonState()}))}))}},{key:"disableButton",value:function(){this._submitButtonSelector.disabled=!0,this._submitButtonSelector.classList.add(this._submitButtonDisabled)}},{key:"enableButton",value:function(){this._submitButtonSelector.disabled=!1,this._submitButtonSelector.classList.remove(this._submitButtonDisabled)}},{key:"hideValidationErrors",value:function(){var t=this;this._inputsList.forEach((function(e){return t._hideInputError(e)}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&o(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==u(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==u(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===u(o)?o:String(o)),r)}var o}var c=function(){function t(e,n){var r=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._renderer=r,this._container=document.querySelector(n)}var e,n;return e=t,(n=[{key:"addItem",value:function(t){this._container.append(t)}},{key:"clear",value:function(){this._container.innerHTML=""}},{key:"renderItems",value:function(t,e){var n=this;t.forEach((function(t){n._renderer(t,e)}))}}])&&a(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function l(t){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(t)}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==l(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==l(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===l(o)?o:String(o)),r)}var o}var f=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popupElement=document.querySelector(e),this._popupCloseHandler=this._handlePopupClose.bind(this),this._popupEscCloseHandler=this._handleEscClose.bind(this)}var e,n;return e=t,(n=[{key:"open",value:function(){this._popupElement.classList.add("popup_opened"),this._setEventListeners()}},{key:"close",value:function(){this._popupElement.classList.remove("popup_opened"),this._popupElement.removeEventListener("click",this._popupCloseHandler),document.removeEventListener("keydown",this._popupEscCloseHandler)}},{key:"_handlePopupClose",value:function(t){this._classList=t.target.classList,(this._classList.contains("popup_opened")||this._classList.contains("popup__btn_type_close"))&&this.close()}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"_setEventListeners",value:function(){this._popupElement.addEventListener("click",this._popupCloseHandler),document.addEventListener("keydown",this._popupEscCloseHandler)}}])&&s(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function p(t){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p(t)}function y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==p(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==p(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===p(o)?o:String(o)),r)}var o}function m(){return m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=b(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},m.apply(this,arguments)}function h(t,e){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},h(t,e)}function b(t){return b=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},b(t)}var d=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&h(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=b(r);if(o){var n=b(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===p(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,t))._popupImage=e._popupElement.querySelector(".popup__image"),e._popupImageSubtext=e._popupElement.querySelector(".popup__image-subtext"),e}return e=u,(n=[{key:"open",value:function(t){var e=t.name,n=t.link;this._popupImage.src=n,this._popupImage.alt=e,this._popupImageSubtext.textContent=e,m(b(u.prototype),"open",this).call(this)}}])&&y(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(f);function v(t){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}function _(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==v(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==v(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===v(o)?o:String(o)),r)}var o}function S(){return S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=E(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},S.apply(this,arguments)}function k(t,e){return k=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},k(t,e)}function E(t){return E=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},E(t)}var g=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&k(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=E(r);if(o){var n=E(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===v(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){var n,r=t.formSubmitCallback;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._formSubmitCallback=r,n._formElement=n._popupElement.querySelector(".form"),n._submitButton=n._popupElement.querySelector(".form__btn"),n}return e=u,(n=[{key:"open",value:function(){S(E(u.prototype),"open",this).call(this),this._formElement.reset(),this._submitButton.textContent="Сохранить"}},{key:"_getInputValues",value:function(){var t=this;return this._inputValues={},this._inputElementsList=Array.from(this._popupElement.querySelectorAll(".form__input")),this._inputElementsList.forEach((function(e){t._inputValues[e.getAttribute("name")]=e.value})),this._inputValues}},{key:"_setEventListeners",value:function(){var t=this;S(E(u.prototype),"_setEventListeners",this).call(this),this._formElement.addEventListener("submit",(function(e){e.preventDefault(),t._formSubmitCallback(t._getInputValues()),t.changeSubmitButtonText("Сохранение...")}),{once:!0})}},{key:"changeSubmitButtonText",value:function(t){this._submitButton.textContent=t}},{key:"close",value:function(){S(E(u.prototype),"close",this).call(this)}}])&&_(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(f);function w(t){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(t)}function C(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==w(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==w(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===w(o)?o:String(o)),r)}var o}function j(){return j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=P(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},j.apply(this,arguments)}function O(t,e){return O=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},O(t,e)}function P(t){return P=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},P(t)}var L=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&O(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=P(r);if(o){var n=P(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===w(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e,n){var r,o=t.formSubmitCallback;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(r=i.call(this,e))._formSubmitCallback=o,r._formElement=r._popupElement.querySelector(".form"),r}return e=u,(n=[{key:"_setEventListeners",value:function(){var t=this;j(P(u.prototype),"_setEventListeners",this).call(this),this._formElement.addEventListener("submit",(function(e){t._formSubmitCallback(e)}),{once:!0})}}])&&C(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(f);function D(t){return D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},D(t)}function B(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==D(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==D(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===D(o)?o:String(o)),r)}var o}var T=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._userNameSelector=document.querySelector(".profile__name"),this._userAboutSelector=document.querySelector(".profile__job"),this._userAvatarSelector=document.querySelector(".profile__avatar")}var e,n;return e=t,(n=[{key:"getUserInfo",value:function(){return this.userData={name:this._userNameSelector.textContent,about:this._userAboutSelector.textContent},this.userData}},{key:"setUserInfo",value:function(t){this._userNameSelector.textContent=t.name,this._userAboutSelector.textContent=t.about,this._userAvatarSelector.src=t.avatar}},{key:"insertUserInfo",value:function(t){this._userNameSelector.textContent=t.name,this._userAboutSelector.textContent=t.about}},{key:"changeUserAvatar",value:function(t){this._userAvatarSelector.src=t}}])&&B(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function I(t){return I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},I(t)}function R(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==I(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==I(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===I(o)?o:String(o)),r)}var o}var q=function(){function t(e){var n=e.url,r=e.token;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.url=n,this.token=r}var e,n;return e=t,(n=[{key:"_getResponseData",value:function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}},{key:"getUserData",value:function(){var t=this;return fetch("".concat(this.url,"/users/me"),{headers:{authorization:this.token}}).then((function(e){return t._getResponseData(e)}))}},{key:"getInitialCards",value:function(){var t=this;return fetch("".concat(this.url,"/cards"),{headers:{authorization:this.token}}).then((function(e){return t._getResponseData(e)}))}},{key:"editUserInfo",value:function(t){return fetch("".concat(this.url,"/users/me"),{method:"PATCH",headers:{authorization:this.token,"Content-Type":"application/json"},body:JSON.stringify(t)})}},{key:"editUserAvatar",value:function(t){return fetch("".concat(this.url,"/users/me/avatar"),{method:"PATCH",headers:{authorization:this.token,"Content-Type":"application/json"},body:JSON.stringify(t)})}},{key:"addNewCard",value:function(t){var e=this;return fetch("".concat(this.url,"/cards"),{method:"POST",headers:{authorization:this.token,"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(t){return e._getResponseData(t)}))}},{key:"deleteCard",value:function(t){var e=this;return fetch("".concat(this.url,"/cards/").concat(t),{method:"DELETE",headers:{authorization:this.token}}).then((function(t){return e._getResponseData(t)}))}},{key:"likeCard",value:function(t){var e=this;return fetch("".concat(this.url,"/cards/").concat(t,"/likes"),{method:"PUT",headers:{authorization:this.token}}).then((function(t){return e._getResponseData(t)}))}},{key:"unlikeCard",value:function(t){var e=this;return fetch("".concat(this.url,"/cards/").concat(t,"/likes"),{method:"DELETE",headers:{authorization:this.token}}).then((function(t){return e._getResponseData(t)}))}}])&&R(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}(),x=document.querySelector(".profile__btn_type_edit"),A=document.querySelector("#edit-profile-form"),N=A.querySelector("#name"),U=A.querySelector("#job"),V=document.querySelector(".profile__avatar-btn"),H=document.querySelector("#edit-avatar-form"),z=document.querySelector(".profile__btn_type_add"),J=document.querySelector("#add-card-form"),M={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__btn",submitButtonDisabled:"form__btn_disabled",inputErrorClass:"form__input_state_error",inputErrorText:".form__input-error"},F=new i(M,A),G=new i(M,H),K=new i(M,J),Q=new q({url:"https://mesto.nomoreparties.co/v1/cohort-72",token:"4de05b98-5a9e-448b-915c-192900b934bb"}),W=new T,X=new c({renderer:function(t,e){X.addItem(tt(t,e))}},"#gallery-list");Promise.all([Q.getUserData(),Q.getInitialCards()]).then((function(t){var e=t[0],n=t[1];W.setUserInfo(e),X.renderItems(n,e);var r=new g({formSubmitCallback:function(t){Q.addNewCard(t).then((function(t){X.addItem(tt(t,e)),r.close()})).catch((function(t){console.log(t)}))}},"#popup-add-card");z.addEventListener("click",(function(){r.open(),r.changeSubmitButtonText("Создать"),K.hideValidationErrors(),K.disableButton()}))})).catch((function(t){console.log(t)}));var Y=new g({formSubmitCallback:function(t){Q.editUserInfo(t).then((function(){W.insertUserInfo(t),Y.close()})).catch((function(t){console.log(t)}))}},"#popup-edit-profile"),Z=new g({formSubmitCallback:function(t){Q.editUserAvatar(t).then((function(){W.changeUserAvatar(t.avatar)})).catch((function(t){console.log(t)})),Z.close()}},"#popup-edit-avatar"),$=new d("#popup-view-image");function tt(t,e){var r=new n(t,e,{handleCardClick:function(){$.open(t)},handleCardLike:function(t){r.isButtonLikeActive()?Q.unlikeCard(t._id).then((function(t){r.setLikesNumber(t)})).then((function(){r.setButtonLikeInactive()})):Q.likeCard(t._id).then((function(t){r.setLikesNumber(t)})).then((function(){r.setButtonLikeActive()}))},handleCardDelete:function(t){var e=new L({formSubmitCallback:function(n){n.preventDefault(),Q.deleteCard(t._id).catch((function(t){console.log(t)})),r.removeCardElement(),e.close()}},"#popup-delete-card");e.open()},checkDeleteAccess:function(){e._id!=t.owner._id&&r.removeButtonDeleteElement()}},"#card-template");return r.createCard()}x.addEventListener("click",(function(){Y.open(),F.hideValidationErrors(),F.enableButton();var t=W.getUserInfo();N.value=t.name,U.value=t.about})),V.addEventListener("click",(function(){Z.open(),G.hideValidationErrors(),G.disableButton()})),F.enableValidation(),G.enableValidation(),K.enableValidation()})();
//# sourceMappingURL=main.js.map