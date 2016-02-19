/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Matter = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"matter\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))

	var Engine = Matter.Engine,
	    World = Matter.World,
	    Bodies = Matter.Bodies;

	// create a Matter.js engine
	var engine = Engine.create(document.body);

	// create two boxes and a ground
	var boxA = Bodies.rectangle(400, 200, 80, 80);
	var boxB = Bodies.rectangle(450, 50, 80, 80);
	var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

	// add all of the bodies to the world
	World.add(engine.world, [boxA, boxB, ground]);

	// run the engine
	Engine.run(engine);


/***/ }
/******/ ]);