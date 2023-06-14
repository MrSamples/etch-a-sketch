const button = document.querySelector("button");
const container = document.querySelector(".container");

let play = true;

function darker(div) {
    if (play) {
        color = window.getComputedStyle(div).getPropertyValue("background-color");
        if (color.substring(4, 5) == "0")
            return;
        else if (color.substring(6, 7) == ",")
            color = color.substring(4, 6);
        else 
            color = color.substring(4, 7);
        color -= 24;
        div.style.backgroundColor = `rgb(${color}, ${color}, ${color})`;
    }
}

function createGrid(rowSize=16, numSquares=256) {
    for (let i = 0; i < numSquares; ++i) {
            const div = document.createElement("div");
            div.classList.add("square");
            let squareSize = 100 / rowSize;
            div.style.width = `${squareSize}vw`;
            div.style.height = `${squareSize}vh`;
            container.appendChild(div);
            div.style.backgroundColor = "#f0f0f0";
            div.addEventListener("mouseover", function () { darker(div); });
    }
}

function setRowSize() {
    let rowSize = parseInt(prompt("What resolution would you like your Etch-A-Sketch (max 100)?\n        p.s. Hold left click to temporarily disable drawing. "));
    console.log(rowSize);
    console.log(typeof rowSize);
    
    container.innerHTML = "";

    if (rowSize < 1 || isNaN(rowSize))
        rowSize = 16;
    if (rowSize > 100)
        rowSize = 100;

    let numSquares = rowSize * rowSize;

    createGrid(rowSize, numSquares);
}

button.addEventListener("click", function () {setRowSize()});

document.addEventListener("mousedown", function(e){ e.preventDefault(); play = false; });
document.addEventListener("mouseup", function(e){ e.preventDefault(); play = true; });

createGrid();
