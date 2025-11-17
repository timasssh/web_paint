const formTools = document.getElementById("controls");
const paint_board = document.getElementById("paint_board");
const undoButton = document.getElementById("undo_button");
const saveImageButton = document.getElementById("save-image");

let counter = 0;
let strokeClassIdentifier = 0;

let initialFormData = new FormData(formTools);
let selectedColor = initialFormData.get("color");
let selectedBrushSize = initialFormData.get("paint-brush-size");
let selectedStrokeRadius = initialFormData.get("stroke-radius");
paint_board.addEventListener("mousedown", paint_brush);

formTools.addEventListener("input", (event) => {
    event.preventDefault();
    removeEventListersTool();

    let formData = new FormData(formTools);

    selectedColor = formData.get("color");
    selectedBrushSize = formData.get("paint-brush-size");
    selectedStrokeRadius = formData.get("stroke-radius");
    let selectedTool = formData.get("selectedTool");

    if(selectedTool === "paint-brush") {
        paint_board.addEventListener("mousedown", paint_brush);
    }else if(selectedTool === "eraser") {
        paint_board.addEventListener("mousedown", eraser);
    }else if(selectedTool === "bucket") {
        paint_board.addEventListener("click", bucket);
    }
});


function removeEventListersTool() {
    paint_board.removeEventListener("mousedown", paint_brush);
    paint_board.removeEventListener("mousedown", eraser);
    paint_board.removeEventListener("click", bucket);
}
function increaseCounter() {
    counter++;
    strokeClassIdentifier++;

    undoButton.classList.remove("disabledIcon");
    undoButton.addEventListener("click", undo);
}
function decreaseCounter() {
    counter--;
    undoButton.classList.add("disabledIcon");
    undoButton.removeEventListener("click", undo);
}

function createPixel() {
    if(event.target.id !== paint_board.id) { return false }
    
    let span = document.createElement("span");
    span.style.backgroundColor = selectedColor;
    span.classList.add("stroke");
    span.classList.add(`stroke${strokeClassIdentifier}`);
    span.style.left = `${event.layerX}px`;
    span.style.top = `${event.layerY}px`;
    span.style.height = `${selectedBrushSize}px`;
    span.style.width = `${selectedBrushSize}px`;
    span.style.borderRadius = `${selectedStrokeRadius}%`;
    
    paint_board.appendChild(span);

    return true;
}
function paint_brush() {
    if(!createPixel()) { return };
    paint_board.addEventListener("mousemove", createPixel);

    function stopPainting() {
        paint_board.removeEventListener("mousemove", createPixel);
        increaseCounter();

        paint_board.removeEventListener("mouseup", stopPainting);
        paint_board.removeEventListener("mouseleave", stopPainting);
    }

    paint_board.addEventListener("mouseup", stopPainting);
    paint_board.addEventListener("mouseleave", stopPainting);
}

function removeStroke() {
    let strokeClass = typeof arguments[0] === "string" ? arguments[0] : event.target.classList[1];
    
    let strokeSpans = paint_board.querySelectorAll(`span.${strokeClass}`);

    strokeSpans.forEach((span) => {
        span.remove();
    });

    return true;
}
function eraser() {
    paint_board.addEventListener("mousemove", removeStroke);

    function stopErasing() {
        paint_board.removeEventListener("mousemove", removeStroke);

        paint_board.removeEventListener("mouseup", stopErasing);
        paint_board.removeEventListener("mouseleave", stopErasing);

        console.log("stoping erase");
    }

    paint_board.addEventListener("mouseleave", stopErasing);
    paint_board.addEventListener("mouseup", stopErasing);
}

function changeBackgroundColorOfElement(element) {
    element.style.backgroundColor = selectedColor;
}
function bucket() {
    if(event.target.id !== paint_board.id && !event.target.classList.contains("stroke")) { return }

    if(event.target.id === paint_board.id) {
        changeBackgroundColorOfElement(paint_board);
    }else {
        let strokeClass = event.target.classList[1];
        let strokeSpans = paint_board.querySelectorAll(`span.${strokeClass}`);

        strokeSpans.forEach((span) => {
            changeBackgroundColorOfElement(span);
        });
    }
}

// TODO: undo working on the "bucket" tool
function undo() {
    decreaseCounter();
    let lastStrokeClass = `stroke${strokeClassIdentifier - 1}`;

    removeStroke(lastStrokeClass);
}
undoButton.addEventListener("click", undo);
saveImageButton.addEventListener("click", () => {
    domtoimage.toPng(paint_board)
        .then((dataUrl) => {
            // saving the png image in the user computer using an A tag
            
            let link = document.createElement("a");
            link.href = dataUrl;
            link.download = "myArt.png";
            link.click();
        })
        .catch((error) => {
            console.error("algo deu errado! ", error);
        });
});