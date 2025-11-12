// FIXME: when the user selects a new tool the paintbrush starts to work, but it is suposed 
// to work just when click in paint board


const formTools = document.getElementById("controls");
const paint_board = document.getElementById("paint_board");
const undoButton = document.getElementById("undo_button");

let counter = 0;

let initialFormData = new FormData(formTools);
let selectedColor = initialFormData.get("color");
// setMouseIcon(initialFormData.get("selectedTool"));
paint_board.addEventListener("mousedown", paint_brush);

formTools.addEventListener("input", (event) => {
    event.preventDefault();
    removeEventListersTool();

    let formData = new FormData(formTools);

    // setMouseIcon(formData.get("selectedTool"));
    selectedColor = formData.get("color");

    if(formData.get("selectedTool") === "paint-brush") {
        paint_board.addEventListener("mousedown", paint_brush);
    }
})
undoButton.addEventListener("click", () => {
    console.log("undoing the last stroke...");
})


function setMouseIcon(selectedTool) {
    let link = window.location;
    document.body.style.cursor = `url('${link}/assets/img/ico/${selectedTool}_icon.ico'), auto`
}

function removeEventListersTool() {
    paint_board.removeEventListener("mousedown", paint_brush());
}

function createPixel() {
    if(event.target.classList.contains("stroke")) { return }

    let span = document.createElement("span");
    span.style.backgroundColor = selectedColor;
    span.classList.add("stroke");
    span.classList.add(`stroke${counter}`);
    span.style.left = `${event.layerX}px`;
    span.style.top = `${event.layerY}px`;
    span.style.height = "10px";
    span.style.width = "10px";

    paint_board.appendChild(span);
}
function paint_brush() {
    paint_board.addEventListener("mousemove", createPixel);

    function stopPainting() {
        paint_board.removeEventListener("mousemove", createPixel);
        // counter++;
        // console.log(counter);
    }

    paint_board.addEventListener("mouseup", () => {
        stopPainting();
        counter++;
        console.log(counter);
    });
    paint_board.addEventListener("mouseleave", () => {
        stopPainting();
        counter++;
        console.log(counter);
    });
}