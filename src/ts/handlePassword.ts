export const printPassword = (element: HTMLInputElement, password: string) => {
  element.value = password;
  element.classList.add("generated");
};

export const copyPassword = (element: HTMLInputElement) => {
  element.select();
  document.execCommand("copy");
};

export const passwordEdit = (element: HTMLInputElement) => {
  element.removeAttribute("readonly");
  element.focus();
  if (!element.nextElementSibling) return;

  element.nextElementSibling.innerHTML = `
    <button class="generated-result__icon" data-password-check>
      <i class="fa-solid fa-check"></i>
    </button>
    `;
};

export const passwordCheck = (element: HTMLInputElement) => {
  element.setAttribute("readonly", "readonly");
  if (!element.nextElementSibling) return;

  element.nextElementSibling.innerHTML = `
    <button class="generated-result__icon" data-password-copy>
      <i class="fa-solid fa-copy"></i>
    </button>
    <button class="generated-result__icon" data-password-edit>
      <i class="fa-regular fa-pen-to-square"></i>
    </button>
    `;
};

export const shufflePassword = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
