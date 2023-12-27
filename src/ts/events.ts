import * as handlePassword from "./handlePassword";
import { getPasswordParams } from "./getPasswordParams";
import { getGeneratedPassword } from "./generatePassword";

const resultWrapperElem = document.getElementById(
  "result-wrapper",
) as HTMLDivElement;
const passwordResultElem = document.getElementById(
  "generated-result",
) as HTMLInputElement;
const formElem = document.getElementById("password-form") as HTMLFormElement;

const passwordLenghtElem = document.getElementById(
  "password-length",
) as HTMLInputElement;

passwordLenghtElem.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  if (passwordLenghtElem.previousElementSibling == null) return;
  passwordLenghtElem.previousElementSibling.textContent = target.value;
});

formElem.addEventListener("submit", (e) => {
  e.preventDefault();
  const checkedParams = Object.values(getPasswordParams).filter(
    (param) => param.checked,
  );

  if (!checkedParams.length) {
    return alert(
      "You need to include at least 1 parametr in your generated password",
    );
  } else {
    return getGeneratedPassword(checkedParams, passwordLenghtElem);
  }
});

resultWrapperElem.addEventListener("click", (e) => {
  const element = e.target as HTMLButtonElement;
  element.closest("[data-password-edit]")
    ? handlePassword.passwordEdit(passwordResultElem)
    : null;
  element.closest("[data-password-copy]")
    ? handlePassword.copyPassword(passwordResultElem)
    : null;
  element.closest("[data-password-check]")
    ? handlePassword.passwordCheck(passwordResultElem)
    : null;
});
