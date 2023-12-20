const passwordResultElem = document.querySelector(
  "[data-password-result]"
) as HTMLSpanElement;

const copyBtnElem = passwordResultElem?.previousElementSibling;
const formElem = document.querySelector("[data-password-form]");

const passwordLenghtElem = formElem?.querySelector(
  "[data-password-length-inp]"
);
const passwordLenghtValueElem = formElem?.querySelector(
  "[data-password-length-value]"
);

const passwordStrengthContainerElem = formElem?.querySelectorAll(
  "[data-password-strength]"
);

let params: any = {};

const passwordParamsElems = formElem?.querySelectorAll(
  "[data-password-param]"
)!;

passwordParamsElems.forEach((par) => {
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
});

export params

console.log(params.lowercase);
console.log(params.uppercase);
console.log(params.number);
console.log(params.symbol);
