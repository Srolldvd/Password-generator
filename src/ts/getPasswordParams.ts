const passwordResultElem = document.querySelector(
  "[data-password-result]",
) as HTMLSpanElement;

const copyBtnElem = passwordResultElem?.previousElementSibling;
export const formElem = document.querySelector("[data-password-form]")!;

const passwordLenghtElem = formElem?.querySelector(
  "[data-password-length-inp]",
);
const passwordLenghtValueElem = formElem?.querySelector(
  "[data-password-length-value]",
);

const passwordStrengthContainerElem = formElem?.querySelectorAll(
  "[data-password-strength]",
)!;

interface params {
  lowercase: HTMLInputElement;
  uppercase: HTMLInputElement;
  numbers: HTMLInputElement;
  symbols: HTMLInputElement;
}

const params: params = {
  lowercase: formElem.querySelector("[data-lowercase-letters]")!,
  uppercase: formElem.querySelector("[data-uppercase-letters]")!,
  numbers: formElem.querySelector("[data-numbers]")!,
  symbols: formElem.querySelector("[data-symbols]")!,
};

const passwordParamsElems = formElem?.querySelectorAll(
  "[data-password-param]",
)!;

/* passwordParamsElems.forEach((par: HTMLElement) => {
  if (par instanceof HTMLElement) {
    if (par.dataset.passwordParam === "lowercase-letters") {
      params["lowercase"] = par;
    } else if (par.dataset.passwordParam === "uppercase-letters") {
      params["uppercase"] = par;
    } else if (par.dataset.passwordParam === "numbers") {
      params["number"] = par;
    } else if (par.dataset.passwordParam === "symbols") {
      params["symbol"] = par;
    }
  }
}); */

export { params };
