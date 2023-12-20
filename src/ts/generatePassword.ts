const paswordGenerator = {};

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

import params from "./getPasswordParams";
