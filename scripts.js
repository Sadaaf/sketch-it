// The container for grid
const container = document.createElement("div");
container.className = "container";

let clickHeld = false;
let color = "#000";

function createGrid(row = 16, column = 16) {
  const rowElements = [];
  const columnElements = [];
  generateCells(row, rowElements);
  generateCells(row, columnElements);

  columnElements.forEach((columnElement) => {
    const column = document.createElement("div");
    column.className = `column${
      columnElement < 10 ? `0${columnElement}` : columnElement
    }`;

    // Generates buttons
    rowElements.forEach((rowElement) => {
      const button = document.createElement("button");
      button.className = `button${
        columnElement < 10 ? `0${columnElement}` : columnElement
      }${rowElement < 10 ? `0${rowElement}` : rowElement}`;
      button.addEventListener("pointerenter", handleMousePointerEntered);
      column.appendChild(button);
    });

    container.appendChild(column);
  });
}

// Add container to the html body
document.body.appendChild(container);

document.body.addEventListener("pointerup", handleMouseClickReleased);
document.body.addEventListener("pointerdown", handleMouseClickHeld);

const recreateButton = document.querySelector(".recreate");
recreateButton.addEventListener("click", takeUserInput);

const randomizeColorButton = document.querySelector(".randomize-color");
randomizeColorButton.addEventListener(
  "click",
  () => (color = getRandomColor())
);

//////////////////////
// Event Listeners //
////////////////////
function takeUserInput() {
  let row = 0;
  let column = 0;
  while (row < 1 || row > 100 || !Number.isInteger(row)) {
    row = Number(prompt("Row = ?"));
  }
  while (column < 1 || column > 100 || !Number.isInteger(column)) {
    column = Number(prompt("Column = ?"));
  }
  container.replaceChildren();
  createGrid(row, column);
}

function handleMouseClickHeld() {
  clickHeld = true;
}

function handleMousePointerEntered(e) {
  if (clickHeld) {
    const buttonClassName = e.target.classList[0];
    const button = document.querySelector(`.${buttonClassName}`);
    button.style.backgroundColor = color;
  }
}

function handleMouseClickReleased() {
  if (clickHeld) clickHeld = false;
}

//////////////////////
// Helper functions //
//////////////////////

// Creates an array of cell names
function generateCells(maxNumberOfCells, cells) {
  for (let i = 0; i < maxNumberOfCells; i++) {
    cells.push(i);
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

////////////////
// App Runner //
////////////////
createGrid();
