module.exports = {
    extend: function (view) {
        return function (parent) {
            parent.innerHTML = view.template;
        };
    }
};
