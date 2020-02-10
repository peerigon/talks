const throttle = (fn, wait) => {
    let previouslyRun;
    let queuedToRun;

    return function invokeFn(...args) {
        const now = Date.now();

        queuedToRun = clearTimeout(queuedToRun);

        if (!previouslyRun || now - previouslyRun >= wait) {
            // eslint-disable-next-line prefer-spread
            fn.apply(null, args);
            previouslyRun = now;
        } else {
            queuedToRun = setTimeout(
                invokeFn.bind(null, ...args),
                wait - (now - previouslyRun)
            );
        }
    };
};

const body = document.getElementById("peerigon");
let timeout;

if (body) {
    body.addEventListener(
        "mousemove",
        throttle(() => {
            clearTimeout(timeout);
            body.dataset.mouseMove = true;
            timeout = setTimeout(() => {
                body.dataset.mouseMove = false;
            }, 1000);
        }, 1000)
    );
}
