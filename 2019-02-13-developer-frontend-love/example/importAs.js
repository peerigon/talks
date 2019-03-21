import ObjectUrl from "object-url-loader";
import logo from "./logo.gif" as ObjectUrl;

async function loadLogo() {
    const img = document.createElement("img");
    img.src = logo;
    return img;
}
