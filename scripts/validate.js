function enableValidation(formSelectors) {
  const formList = Array.from(
    document.querySelectorAll(formSelectors.formSelector)
  );

  function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(
      `.${inputElement.id}-input-error`
    );

    inputElement.classList.add(formSelectors.inputErrorClass);
    errorElement.classList.add(formSelectors.errorClass);
    errorElement.textContent = errorMessage;
  }

  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(
      `.${inputElement.id}-input-error`
    );

    inputElement.classList.remove(formSelectors.inputErrorClass);
    errorElement.classList.remove(formSelectors.errorClass);
    errorElement.textContent = "";
  }

  function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }

  function setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(formSelectors.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      formSelectors.submitButtonSelector
    );

    if (!(formElement.id === "edit-profile-form")) {
      toggleButtonState(inputList, buttonElement);
    }

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement);
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
      buttonElement.classList.add("form__btn_disabled");
    } else {
      buttonElement.classList.remove("form__btn_disabled");
    }
  }

  formList.forEach((formElement) => {
    setEventListeners(formElement, formSelectors);
  });
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__btn",
  inactiveButtonClass: "form__btn_disabled",
  inputErrorClass: "form__input_state_error",
  errorClass: "form__input-error_visible",
});
