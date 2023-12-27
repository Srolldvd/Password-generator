interface passwordStrength {
  weak: "Weak";
  medium: "Medium";
  strong: "Strong";
  veryStrong: "Very Strong";
}

const passwordStrengthLevels: passwordStrength = {
  weak: "Weak",
  medium: "Medium",
  strong: "Strong",
  veryStrong: "Very Strong",
};

export const calculatePasswordStrength = (
  element: HTMLSpanElement,
  pointElements: NodeListOf<HTMLSpanElement>,
  password: string,
  passwordParams: any,
) => {
  const passwordLength = password.length;
  const passwordParamsLength = passwordParams.length;
  let passwordScore = 0;

  for (let i = 0; i <= passwordParamsLength; i++) {
    passwordScore += 3;
  }

  for (let j = 0; j <= passwordLength; j++) {
    passwordScore += 5;
  }

  passwordScore = Math.ceil(passwordScore);
  pointElements.forEach(
    (element) => (element.style.backgroundColor = "transparent"),
  );

  if (passwordScore <= 50) {
    element.textContent = passwordStrengthLevels.weak;
    pointElements.forEach(
      (element, index) => index < 1 && (element.style.backgroundColor = "gold"),
    );
  } else if (passwordScore < 65) {
    element.textContent = passwordStrengthLevels.medium;
    pointElements.forEach(
      (element, index) => index < 2 && (element.style.backgroundColor = "gold"),
    );
  } else if (passwordScore <= 80) {
    element.textContent = passwordStrengthLevels.strong;
    pointElements.forEach(
      (element, index) => index < 3 && (element.style.backgroundColor = "gold"),
    );
  } else if (passwordScore > 80) {
    element.textContent = passwordStrengthLevels.veryStrong;
    pointElements.forEach(
      (element, index) => index < 4 && (element.style.backgroundColor = "gold"),
    );
  }
};
