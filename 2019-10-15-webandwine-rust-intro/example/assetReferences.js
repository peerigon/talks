asset logo from "./logo.gif";

async function loadLogo() {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(logo);
    return img;
}
