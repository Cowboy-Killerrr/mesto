function enableValidation(formSelectors) {
  const formList = Array.from(document.querySelectorAll(formSelectors.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, formSelectors);
  });
}

function showInputError(formElement, inputElement, errorMessage, formSelectors) {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );

  inputElement.classList.add(formSelectors.inputErrorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, formSelectors) {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );

  inputElement.classList.remove(formSelectors.inputErrorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, formSelectors) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formSelectors);
  } else {
    hideInputError(formElement, inputElement, formSelectors);
  }
}

function setEventListeners(formElement, formSelectors) {
  const inputList = Array.from(formElement.querySelectorAll(formSelectors.inputSelector));
  const buttonElement = formElement.querySelector(formSelectors.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, formSelectors);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    enableButton(buttonElement)
  }
}

function disableButton(buttonElement) {
  buttonElement.disabled = true;
}

function enableButton(buttonElement) {
  buttonElement.disabled = false;
}

function hideValidationErrors(formElement) {
  const inputElements = Array.from(formElement.querySelectorAll('.form__input'));
  const inputErrorElements = Array.from(formElement.querySelectorAll('.form__input-error'));

  inputElements.forEach(inputElement => {
    inputElement.classList.remove('form__input_state_error');
  })

  inputErrorElements.forEach(inputErrorElement => {
    inputErrorElement.textContent = '';
  })
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__btn",
  inactiveButtonClass: "form__btn_disabled",
  inputErrorClass: "form__input_state_error",
});
