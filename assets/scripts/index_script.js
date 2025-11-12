const formTools = document.getElementById("controls");
let paint_board = document.getElementById("paint_board");
const undoButton = document.getElementById("undo_button");

let counter = 0;

let initialFormData = new FormData(formTools);
let selectedColor = initialFormData.get("color");
let selectedBrushSize = initialFormData.get("paint-brush-size");
paint_board.addEventListener("mousedown", paint_brush);

formTools.addEventListener("input", (event) => {
    event.preventDefault();
    removeEventListersTool();

    let formData = new FormData(formTools);

    selectedColor = formData.get("color");
    selectedBrushSize = formData.get("paint-brush-size");

    if(formData.get("selectedTool") === "paint-brush") {
        paint_board.addEventListener("mousedown", paint_brush);
    }
})
undoButton.addEventListener("click", () => {
    console.log("undoing the last stroke...");
})


function removeEventListersTool() {
    paint_board.removeEventListener("mousedown", paint_brush);
}

function createPixel() {
    if(event.target.id !== paint_board.id) { return false}
    
    let span = document.createElement("span");
    span.style.backgroundColor = selectedColor;
    span.classList.add("stroke");
    span.classList.add(`stroke${counter}`);
    span.style.left = `${event.layerX}px`;
    span.style.top = `${event.layerY}px`;
    span.style.height = `${selectedBrushSize}px`;
    span.style.width = `${selectedBrushSize}px`;
    
    paint_board.appendChild(span);

    return true;
}
function paint_brush() {
    if(!createPixel()) {return false};
    paint_board.addEventListener("mousemove", createPixel);

    function stopPainting() {
        paint_board.removeEventListener("mousemove", createPixel);
        counter++;
        console.log(counter);

        paint_board.removeEventListener("mouseup", stopPainting);
        paint_board.removeEventListener("mouseleave", stopPainting);
    }

    paint_board.addEventListener("mouseup", stopPainting);
    paint_board.addEventListener("mouseleave", stopPainting);

}