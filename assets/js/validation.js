const form = document.querySelector("#form");

const playerOne = document.querySelector("#playerOne");
const playerTwo = document.querySelector("#playerTwo");

const errorNameOne = document.querySelector("#errorNameOne");
const errorNameTwo = document.querySelector("#errorNameTwo");

form.addEventListener("submit", (e) => {
  e.preventDefault(); 

  const nameCheck = /^[a-zA-Z]/;

  
  errorNameOne.innerText = "";
  errorNameTwo.innerText = "";

  let isValid = true;

  if (!playerOne.value.match(nameCheck)) {
    errorNameOne.innerText = "Le nom doit contenir au moins 8 caractères.";
    errorNameOne.style.display = "block";
    errorNameOne.style.color = "red";
    isValid = false;
  }

  if (!playerTwo.value.match(nameCheck)) {
    errorNameTwo.innerText = "Le nom doit contenir au moins 8 caractères.";
    errorNameTwo.style.display = "block";
    errorNameTwo.style.color = "red";
    isValid = false;
  }

  if (isValid) {
    localStorage.setItem("playerOne", playerOne.value);
    localStorage.setItem("playerTow", playerTwo.value);

    window.location.href = "index.html";
  }
});