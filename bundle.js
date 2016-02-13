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
	var Group = __webpack_require__(1);

	p = new Group();
	p.dPos = [0,0];

	pp = new Group();
	pp.setOrigin(p);
	pp.dPos = [2,2];

	debugger;


	debugger;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(2);

	function Group() {
	  // parent can be position(global level) or another group
	  this.origin;
	  this.dPos;

	  this.nodes = [];
	  this.children = [];

	  this.angle;

	  this.material = {};
	  this.solid = {};

	  this.generate;
	  this.regenerating;

	}

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

	  var i = this.children.indexOf(child);
	  if (i > -1) { this.children.splice(i, 1); }

	  child.setOrigin();
	}

	Group.prototype.screenPos = function (viewPos) {
	  if (!this.origin) {
	    return Util.prototype.vDiff(
	      viewPos,
	      this.dPos
	    );
	  } else {
	    return Util.prototype.vSum(
	      this.dPos,
	      this.origin.screenPos(viewPos)
	    );
	  }
	}

	Group.prototype.draw = function() {

	}

	module.exports = Group;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Util() {
	};

	Util.prototype.random = function(min, max) {

	  //handle 2d array acting as range
	  if (min.__proto__.constructor.name === "Array") {
	    max = min[1];
	    min = min[0];
	  }

	  return Math.random() * (max-min) + min;

	};


	Util.prototype.vSum = function(end, start) {
	  if (start == undefined) { start = [0,0]; }

	  return [start[0] + end[0], start[1] + end[1]];
	}

	Util.prototype.vDiff = function(origin, pos){

	  return [pos[0] - origin[0], pos[1] - origin[1]];
	  
	}
	module.exports = Util;


/***/ }
/******/ ]);