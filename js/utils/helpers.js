export const showError = (element, message) => {
  element.style.borderColor = "red";
  if (element.parentNode.querySelector(".error-message")) return;

  const errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.textContent = message;
  errorElement.style.color = "red";
  errorElement.style.fontSize = "12px";
  element.parentNode.appendChild(errorElement);
};

export const clearErrors = (element) => {
  element.style.borderColor = "";
  const errorElement = element.parentNode.querySelector(".error-message");
  if (errorElement) errorElement.remove();
};
