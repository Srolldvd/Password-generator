import { params, formElem } from "./getPasswordParams";

console.log(params);

const checkedParams = Object.values(params).filter((param) => {
  return param.checked;
});

formElem.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  let generatedPassword = "";
  const checkedParams = Object.values(params).filter((param) => {
    return param.checked;
  });

  console.log(checkedParams);

  if (!checkedParams.length) {
    return alert(
      "You need to include at least 1 parametr in your generated password",
    );
  }

  let arr: any = [];

  const abc = () => {
    return checkedParams.map((param) => {
      if (param.id === "uppercase-letters") {
        arr.push(getUpperCaseLetter());
      } else if (param.id === "lowercase-letters") {
        arr.push(getLowerCaseLetter());
      } else if (param.id === "numbers") {
        arr.push(getNumber());
      } else if (param.id === "symbols") {
        arr.push(getSymbol());
      }
    });
  };

  let value = Math.ceil(19 / checkedParams.length);

  for (let i = 0; i < value; i++) {
    abc();
  }

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(arr);
  arr = arr.join("").slice(0, 19);

  console.log(arr);
  console.log(arr.length);
});

const getUpperCaseLetter: () => String = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getLowerCaseLetter: () => String = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getNumber: () => String = () => {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

const getSymbol: () => String = () => {
  return String.fromCharCode(Math.floor(Math.random() * 15) + 33);
};
