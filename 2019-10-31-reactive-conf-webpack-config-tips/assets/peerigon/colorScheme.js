var defaultColorScheme = "minze";

function setColorScheme(colorScheme) {
    switch (colorScheme) {
        case "minze":
        case "whiskey":
        case "spinat": {
            document.body.setAttribute("data-color-scheme", colorScheme);
            break;
        }
        default: {
            document.body.setAttribute("data-color-scheme", defaultColorScheme);
        }
    }
}

function onSlideShow(event) {
    setColorScheme(event.currentSlide.dataset.colorScheme);
}

Reveal.addEventListener("ready", onSlideShow);
Reveal.addEventListener("slidechanged", onSlideShow);
