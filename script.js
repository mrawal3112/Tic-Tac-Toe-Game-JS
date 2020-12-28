const circleClass = "circle";
const closeClass = "close";
const container = document.querySelector(".container");
const cells = document.querySelectorAll(".cell");
const finalMessage = document.getElementById("Message");
const restartButton = document.getElementById("restartButton");
const finalResultMessage = document.querySelector(".resultText");

let circleTurn;
const WINNING_COMBINATIONS = [
  // winning combinations
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame(); //Start Game Function (Calling)

restartButton.addEventListener("click", startGame);

function startGame() {
  //defining the Start function
  circleTurn = false; //setting the value of circle turn to false
  cells.forEach((cell) => {
    cell.classList.remove(circleClass); //removing any class defined earlier
    cell.classList.remove(closeClass);
    cell.innerHTML = ""; //emptying the cells
    cell.removeEventListener("click", handleEvent); //removing the event listener from the cells
    cell.addEventListener("click", handleEvent, { once: true }); //adding event listener for new game
  });
  finalMessage.classList.remove("show"); //removing the message pane on restart button
}

function handleEvent(e) {
  // handler function
  let name = e.target; //storing the cell details
  const currentClass = circleTurn ? circleClass : closeClass; // determining the current class to be added to the cells
  addImage(name, currentClass); // function call
  if (checkWin(currentClass)) {
    // function to check who won
    endGame(false);
  } else if (isDraw()) {
    // function call if no one wins
    endGame(true);
  } else {
    swapturn(); // changing the values/ swaping the classes
  }
}

function addImage(a, b) {
  // defining the functionlity how to add images on cells  on click
  if (b === closeClass) {
    a.classList.add("close");
    a.innerHTML = `<img src='Images/close.png'>`;
  } else {
    a.classList.add("circle");
    a.innerHTML = `<img src='Images/circle.png'>`;
  }
}
function swapturn() {
  // swapping the classes / changing from false to true
  circleTurn = !circleTurn;
}

function checkWin(currentClass) {
  // function to check if any one wins
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  // displaying the result
  if (draw) {
    finalResultMessage.innerText = "Draw!";
  } else {
    finalResultMessage.innerText = `${
      circleTurn ? "Player Two" : "Player One"
    } Wins!`;
  }
  finalMessage.classList.add("show");
}

function isDraw() {
  // condition to check for a draw.
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(closeClass) ||
      cell.classList.contains(circleClass)
    );
  });
}
