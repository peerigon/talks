import styles, {exampleClass} from "./styles.css";

class MyElement extends HTMLElement {
    constructor() {
        /* ... */
        this.shadowRoot.moreStyleSheets.push(styles);
        this.shadowRoot.innerHTML =
            `<div class="${exampleClass}"></div>`;
    }
}
