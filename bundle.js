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

	// var GrpNode = require('./grpNode.js');
	var Group = __webpack_require__(2);



	debugger;


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	function Group() {
	  // parent can be position(global level) or another group
	  this.origin;
	  this.relativePos;

	  this.nodes = [];
	  this.children = [];

	  this.angle;

	  this.material = {};
	  this.solid = {};

	  this.generate;
	  this.regenerating;

	}

	Group.prototype.hi = function() {console.log('hi');};

	Group.prototype.setOrigin = function(newOrigin) {
	  this.origin = newOrigin;
	  if (newOrigin) {
	    newOrigin.children.push(this);
	  }
	};

	Group.prototype.addChild = function(child) {
	  child.setOrigin.call(child, this);
	}

	Group.prototype.removeChild = function(child) {
	  this.children.remove(child);
	  child.setOrigin();
	}

	Group.prototype.draw = function() {

	}

	module.exports = Group;


/***/ }
/******/ ]);