const DEFAULT_SIZE = 16;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
const grid = document.querySelector(".grid");
const reloadButton = document.querySelector("#reload");
reloadButton.addEventListener("click", reloadGrid);
let currentSize = DEFAULT_SIZE;

function reloadGrid() {
    clearGrid();
    createGrid(currentSize);
}

function clearGrid() {
    grid.innerHTML = "";
}

function changeColor(e) {
    if (e.type === "mouseover" && !mouseDown) return;
    const startRGB = 0;
    const decreaserRGB = 0.25;
    let opacityRGB = 0;
    let currentColor = e.target.style.backgroundColor;
    console.log(currentColor);
    if (currentColor.includes("rgb(")) return;
    let reColor = /\d+/;
    let pastColor = currentColor;
    currentColor = currentColor.match(reColor);
    let reOpacity = /\d+\.\d+/;
    //if the color is null paint the initial RGB, else increase opacity
    if (e.target.style.backgroundColor === "") {
        nextColor = `rgba(${startRGB},${startRGB},${startRGB},0.1)`;
    } else {
        opacityRGB = +pastColor.match(reOpacity) + decreaserRGB;
        nextColor = `rgba(${currentColor},${currentColor},${currentColor},${opacityRGB})`;
    }
    
    //Set the next color
    e.target.style.backgroundColor = nextColor;
}

function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement("div");
        gridElement.classList.add("grid-element");
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        grid.appendChild(gridElement);
    }
}

createGrid(currentSize);