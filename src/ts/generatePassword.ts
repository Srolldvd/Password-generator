import { params, formElem, passwordLenghtElem } from "./getPasswordParams";

formElem.addEventListener("submit", (e) => {
  e.preventDefault();
  const checkedParams = Object.values(params).filter((param) => param.checked);
  if (!checkedParams.length) {
    return alert(
      "You need to include at least 1 parametr in your generated password",
    );
  }

  let arr: string[] = [];
  let generatedPassword: string = "";
  const passwordResultElem = document.getElementById(
    "generated-result",
  ) as HTMLSpanElement;

  const abc = () => {
    return checkedParams.map((param) => {
      switch (param.id) {
        case "uppercase-letters":
          arr.push(getUpperCaseLetter());
          break;
        case "lowercase-letters":
          arr.push(getLowerCaseLetter());
          break;
        case "numbers":
          arr.push(getNumber());
          break;
        case "symbols":
          arr.push(getSymbol());
          break;
      }
    });
  };

  let value: any = Math.ceil(
    parseInt(passwordLenghtElem.value) / checkedParams.length,
  );

  for (let i = 0; i <= value; i++) {
    abc();
  }

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(arr);
  generatedPassword = arr.join("").slice(0, parseInt(passwordLenghtElem.value));

  printPassword(passwordResultElem, generatedPassword);
});

const getUpperCaseLetter: () => string = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getLowerCaseLetter: () => string = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getNumber: () => string = () => {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

const getSymbol: () => string = () => {
  return String.fromCharCode(Math.floor(Math.random() * 15) + 33);
};

const printPassword = (element: HTMLSpanElement, password: string) => {
  element.textContent = password;
  element.classList.add("generated");
};
