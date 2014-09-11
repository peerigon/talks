/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var HelloWorld = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var View = __webpack_require__(2);

	module.exports = View.extend({
	    template: __webpack_require__(3),
	    styles: __webpack_require__(4)
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	    extend: function (view) {
	        return function (parent) {
	            parent.innerHTML = view.template;
	        };
	    }
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"hello-world\">\r\n    <h1>Hello World</h1>\r\n    <img src=\"" + __webpack_require__(6) + "\">\r\n</div>\r\n";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		"@font-face {\r\n    font-family: 'Yanone Kaffeesatz';\r\n    src: url("+__webpack_require__(5)+") format('opentype');\r\n    font-weight: normal;\r\n    font-style: normal;\r\n}\r\n\r\n.hello-world h1 {\r\n    color: hotpink;\r\n}\r\n";

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "c83e8869cc75b1463cb291373a051753.woff"

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "8f73676dc795be128a9bc94a2695e3be.svg"

/***/ }
/******/ ])