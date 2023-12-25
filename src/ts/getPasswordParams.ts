const passwordResultElem = document.querySelector(
  "[data-password-result]",
) as HTMLSpanElement;

const copyBtnElem = passwordResultElem?.previousElementSibling;

export const formElem = document.getElementById(
  "password-form",
) as HTMLFormElement;

export const passwordLenghtElem = formElem?.querySelector(
  "[data-password-length-inp]",
) as HTMLInputElement;
const passwordLenghtValueElem = formElem?.querySelector(
  "[data-password-length-value]",
);

const passwordStrengthContainerElem = formElem?.querySelectorAll(
  "[data-password-strength]",
)!;

passwordLenghtElem?.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  if (passwordLenghtElem.previousElementSibling == null) return;
  passwordLenghtElem.previousElementSibling.textContent = target.value;
});

const params = {
  lowercase: document.getElementById("lowercase-letters") as HTMLInputElement,
  uppercase: document.getElementById("uppercase-letters") as HTMLInputElement,
  numbers: document.getElementById("numbers") as HTMLInputElement,
  symbols: document.getElementById("symbols") as HTMLInputElement,
};

const passwordParamsElems = formElem?.querySelectorAll(
  "[data-password-param]",
)!;

export { params };
