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
    errorNameOne.innerText = "name format incorrect";
    errorNameOne.style.display = "block";
    errorNameOne.style.color = "red";
    isValid = false;
  }

  if (!playerTwo.value.match(nameCheck)) {
    errorNameTwo.innerText = "name format incorrect";
    errorNameTwo.style.display = "block";
    errorNameTwo.style.color = "red";
    isValid = false;
  }

  if (isValid) {
    let playersScores = JSON.parse(localStorage.getItem("playersScores")) || [];

    const newPlayerRecord = {
      playerOneName: playerOne.value,
      scorePlayerOne: 0,
      playerTwoName: playerTwo.value,
      scorePlayerTwo: 0,
    };
  
    playersScores.push(newPlayerRecord);
  
    localStorage.setItem("playersScores", JSON.stringify(playersScores));
   


    window.location.href = "index.html";
  }
});
