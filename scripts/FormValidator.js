export default class FormValidator {
  constructor(formSelectors, formElement) {
    this._formSelector = formSelectors.formSelector;
    this._inputSelector = formSelectors.inputSelector;
    this._submitButtonSelector = formElement.querySelector(formSelectors.submitButtonSelector);
    this._submitButtonDisabled = formSelectors.submitButtonDisabled;
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

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`
    )

    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
  }

  _checkInputValidity() {
    if(!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError(this._inputElement)
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
    this._submitButtonSelector.disabled = true;
    this._submitButtonSelector.classList.add(this._submitButtonDisabled);
  }

  enableButton() {
    this._submitButtonSelector.disabled = false;
    this._submitButtonSelector.classList.remove(this._submitButtonDisabled);
  }

  hideValidationErrors() {
    this._inputsList.forEach((input) => this._hideInputError(input));
  }

  enableValidation() {
    this._setEventListeners();
  }
}