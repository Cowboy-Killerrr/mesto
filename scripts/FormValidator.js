export default class FormValidator {
  constructor(formSelectors, formElement) {
    this._formSelector = formSelectors.formSelector;
    this._inputSelector = formSelectors.inputSelector;
    this._submitButtonSelector = formSelectors.submitButtonSelector;
    this._inputErrorClass = formSelectors.inputErrorClass;
    this._inputErrorText = formSelectors.inputErrorText;

    this._formElement = formElement;
  }

  _showInputError() {
    this._errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-input-error`
    )

    this._inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = this._inputElement.validationMessage;
  }

  _hideInputError() {
    this._errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-input-error`
    )

    this._inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
  }

  _checkInputValidity() {
    if(!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError()
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  _hasInvalidInput() {
    return this._inputsList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  }

  _setEventListeners() {
    this._inputsList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._inputsList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._inputElement = inputElement;
        this._checkInputValidity();
        this._toggleButtonState();
      })
    })
  }

  disableButton() {
    this._formElement.querySelector(this._submitButtonSelector).disabled = true;
  }

  enableButton() {
    this._formElement.querySelector(this._submitButtonSelector).disabled = false;
  }

  hideValidationErrors() {
    this._inputErrorElements = Array.from(this._formElement.querySelectorAll(this._inputErrorText));

    this._inputErrorElements.forEach(inputErrorText => {
      inputErrorText.textContent = '';
    })

    this._inputsList.forEach(inputElement => {
      inputElement.classList.remove(this._inputErrorClass);
    })
  }

  enableValidation() {
    this._setEventListeners();
  }
}