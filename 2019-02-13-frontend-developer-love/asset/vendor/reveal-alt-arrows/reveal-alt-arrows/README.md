# Alt+Arrows Plugin for reveal.js
Ultra small Plugin for [reveal.js](https://github.com/hakimel/reveal.js).
Allows to use ALT(OPTION) + ARROW keys to navigate through slides.

## Installation

Copy the file ```alt-arrows.js``` into the plugin folder of your reveal.js presentation, i.e. ```plugin/alt-arrows```.

Add the plugins to the dependencies in your presentation, as below.

```javascript
Reveal.initialize({
    // ...
    dependencies: [
        // ...
        { src: 'plugin/alt-arrows/alt-arrows.js' },
        // ...
    ]
});
```

## Usage

You can now use ALT(OPTION) + ARROW keys to navigate through slides.
