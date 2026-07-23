
const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");


generateBtn.addEventListener("click", generatePalette);
paletteContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("copy-btn")) {
        const hexValue = e.target.previousElementSibling.textContent;
        navigator.clipboard
                 .writeText(hexValue)
                 .then(() => showCopySucccess(e.target))
                 .catch(err => console.log(err));
    }
    else if(e.target.classList.contains("color")) {
        const colorBox = e.target.closest(".color");
        const hexValue = colorBox.querySelector(".hex-value").textContent;
        const copyBtn = colorBox.querySelector(".copy-btn");
        navigator.clipboard
                 .writeText(hexValue)
                 .then(() => showCopySucccess(copyBtn))
                 .catch(err => console.log(err));
    }
});

function generatePalette() {
    const colors = [];

    for(let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }

    updatePaletteDisplay(colors);
}

function generateRandomColor() {
    let color = "#";
    const letters = "0123456789ABCDEF";

    for(let i = 0; i < 6; i++) {
        const letter = letters.charAt(Math.floor(Math.random() * letters.length));
        color += letter;
    }

    return color;
}

function updatePaletteDisplay(colors) {

    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((box, index) => {
        const color = colors[index];

        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    });
}

function showCopySucccess(element) {
    element.classList.remove("far", "fa-copy");
    element.classList.add("fas", "fa-check");

    element.style.color = "#48bb78";

    setTimeout(() => {
        element.classList.remove("fas", "fa-check");
        element.classList.add("far", "fa-copy");

        element.style.color = "#64748b";
    }, 1500);
}

generatePalette();