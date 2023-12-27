import * as handlePassword from "./handlePassword";
import { calculatePasswordStrength } from "./calculatePasswordStrength";

const passwordResultElem = document.getElementById(
  "generated-result",
) as HTMLInputElement;
const strengthPointsElems: NodeListOf<HTMLSpanElement> =
  document.querySelectorAll("[data-strength-point]");

export const getGeneratedPassword = (
  passwordParams: HTMLInputElement[],
  passwordRange: HTMLInputElement,
) => {
  const passwordStrengthValueElem = strengthPointsElems[0]
    .previousElementSibling as HTMLSpanElement;
  let storedPassword: string[] = [];
  let generatedPassword: string = "";
  let passwordLength: number = Math.ceil(
    parseInt(passwordRange.value) / passwordParams.length,
  );

  const generatePassword = () => {
    return passwordParams.map((param) => {
      switch (param.id) {
        case "uppercase-letters":
          storedPassword.push(getUpperCaseLetter());
          break;
        case "lowercase-letters":
          storedPassword.push(getLowerCaseLetter());
          break;
        case "numbers":
          storedPassword.push(getNumber());
          break;
        case "symbols":
          storedPassword.push(getSymbol());
          break;
      }
    });
  };

  for (let i = 1; i <= passwordLength; i++) {
    generatePassword();
  }

  handlePassword.shufflePassword(storedPassword);
  generatedPassword = storedPassword
    .join("")
    .slice(0, parseInt(passwordRange.value));

  calculatePasswordStrength(
    passwordStrengthValueElem,
    strengthPointsElems,
    generatedPassword,
    passwordParams,
  );
  handlePassword.printPassword(passwordResultElem, generatedPassword);
};

const getUpperCaseLetter = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getLowerCaseLetter = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getNumber = () => {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

const getSymbol = () => {
  return String.fromCharCode(Math.floor(Math.random() * 15) + 33);
};
