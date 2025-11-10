const formTools = document.getElementById("controls");

let initialFormData = new FormData(formTools);
let selectedColor = initialFormData.get("color");
setMouseIcon(initialFormData.get("selectedTool"));

formTools.addEventListener("input", (event) => {
    event.preventDefault();

    let formData = new FormData(formTools);

    setMouseIcon(formData.get("selectedTool"));
    selectedColor = formData.get("color");
})


function setMouseIcon(selectedTool) {
    let link = window.location;
    document.body.style.cursor = `url('${link}/assets/img/ico/${selectedTool}_icon.ico'), auto`
}
