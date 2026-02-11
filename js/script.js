document.addEventListener("DOMContentLoaded", () => {
  console.log("TechStore: System initialized...");

  const cards = document.querySelectorAll(".category-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const categoryName = card.querySelector("h3").innerText;
      alert(
        `You selected the ${categoryName} category! Our stock is being updated.`
      );
    });
  });

  const logo = document.querySelector(".logo");
  logo.addEventListener("mouseover", () => {
    logo.style.transition = "0.3s";
    logo.style.opacity = "0.7";
  });
  logo.addEventListener("mouseout", () => {
    logo.style.opacity = "1";
  });
});
