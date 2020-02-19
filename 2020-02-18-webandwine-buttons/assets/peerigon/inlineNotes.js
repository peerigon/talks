const lSIdentifier = "peerigon-reveal-inline-notes";
const $main = document.getElementById("peerigon");

if ($main) {
    let active = window.localStorage.getItem(lSIdentifier) === "true" || false;

    console.log(active);

    const toggle = on => {
        console.log("toggle", on);
        $main.dataset.inlineNotes = on;
        window.localStorage.setItem(lSIdentifier, on);
        active = !active;
    };

    toggle(active);

    $main.addEventListener("keyup", ev => {
        if (ev.code === "KeyD") {
            toggle(!active);
        }
    });
}
