// The container for grid
const container = document.createElement("div");
container.className = "container";

let clickHeld = false;

handleMouseClickHeld = () => {
  clickHeld = true;
};

handleMousePointerEntered = (e) => {
  if (clickHeld) {
    const buttonClassName = e.target.classList[0];
    const button = document.querySelector(`.${buttonClassName}`);
    button.style.backgroundColor = "black";
  }
};

handleMouseClickReleased = () => {
  if (clickHeld) clickHeld = false;
};

document.body.addEventListener("pointerup", handleMouseClickReleased);

document.body.addEventListener("pointerdown", handleMouseClickHeld);

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

// Adding click event lister to Create New Grid button
const recreateButton = document.querySelector(".recreate");
recreateButton.addEventListener("click", takeUserInput);

//////////////////////
// Helper functions //
//////////////////////

function generateCells(maxNumberOfCells, cells) {
  for (let i = 0; i < maxNumberOfCells; i++) {
    cells.push(i);
  }
}

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

////////////////
// App Runner //
////////////////
createGrid();
