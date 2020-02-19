/**
 * Some presenters (such as Logitech Spotlight) send 39(Right Arrow) as keycode
 * to move to the next slide. By default Right Arrow moves slides to next chapter (navigate right).
 * So if you reassign Right Arrow to move to next slide you will be unable to use it in navigation.
 * This plugin allows you to ise ALT (OPTION) + Arrows to navigate between slides.
 *
 * @author https://github.com/bunopus
 */
(function() {
    document.addEventListener('keydown', function (event) {
        var action;
        var actions = {
            37: 'navigateLeft',
            39: 'navigateRight',
            38: 'navigateUp',
            40: 'navigateDown'
        };

        if (!event.altKey) {
            return false;
        }
        action = actions[event.keyCode];
        if (action && Reveal[action]) {
            Reveal[action]();
            event.preventDefault && event.preventDefault();
        }
    }, false);
})();
