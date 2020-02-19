"use strict";

module.exports = ({mode = "development", debug} = {}) => {
    return {
        mode,
        output: {
            pathinfo: debug === true
        }
    };
};
