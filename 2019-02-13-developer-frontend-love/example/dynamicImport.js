System.import("./myModule.js");
    .then(exports  => /* ... */);

// later became just

import("./myModule.js")
    .then(exports  => /* ... */);
