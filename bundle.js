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

	var View = __webpack_require__(1);
	var Mtn = __webpack_require__(5);
	var Game = __webpack_require__(6);
	var MtnRange = __webpack_require__(7);

	$(function() {

	  var canvasEl = document.getElementsByTagName("canvas")[0];

	  canvasEl.width = window.innerWidth;
	  canvasEl.height = window.innerHeight - 4;

	  var game = new Game();

	  // console.log(Mtn.prototype.genRandom());

	  new View(canvasEl, game);

	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* globals $ */

	var Util = __webpack_require__(2);
	var Key = __webpack_require__(3);
	var Wad = __webpack_require__(4);

	function View(canvas, game) {

	  this.canvas = canvas;
	  this.ctx = canvas.getContext('2d');
	  this.xMin = -canvas.width / 2;
	  this.yMin = -canvas.height / 1.5;
	  this.xRng = canvas.width;
	  this.yRng = canvas.height;

	  this.ctx.width = this.xRng;
	  this.ctx.height = this.yRng;
	  this.dOrigin = [0,0];

	  this.game = game;
	  this.game.view = this;
	  this.game.startWorld();

	  this.bindKeys();

	  this.scroll();

	};

	View.prototype.draw = function () {

	  this.ctx.clearRect(0,0,this.ctx.width, this.ctx.height);
	  var origin = [this.xMin, this.yMin];
	  this.game.draw(this.ctx, origin);

	};

	View.prototype.bindKeys = function(){
	  var that = this;

	  Key("up,right,down,left", function(e) {
	    that.handleKeypress(e.keyIdentifier);
	  });

	};


	View.prototype.KEYMAP = {
	  'Up'   : [ 0,-1],
	  'Right': [ 1, 0],
	  'Down' : [ 0, 1],
	  'Left' : [-1, 0]
	}

	View.prototype.handleKeypress = function (e) {

	  this.dOrigin = this.KEYMAP[e];

	};

	View.prototype.updateKeys = function() {
	  if (!Key.isPressed('left') &&
	      !Key.isPressed('right') &&
	      !Key.isPressed('up') &&
	      !Key.isPressed('down'))
	  {
	    this.dOrigin = [0,0];
	  }
	}

	View.prototype.handleKeyup = function (e) {

	};

	View.prototype.scroll = function () {

	  var that = this;
	  var time = 0;
	  var dTime = 0;

	  that.game.world.childrenAngle = Math.PI;
	  that.game.world.velocity = [-0.01, -0.01];
	  that.game.world.childrenSpin = 0.0005;
	  // debugger;
	  that.game.world.acceleration = [0.000004, -0.000005];
	// var count = 0;

	  var update = function(t) {

	    dTime = t-time;
	    time = t;
	    //
	    // that.draw();

	    // if (that.game.world.collides(that.game.rightArm) ||
	    //     that.game.rightArm.collides(that.game.world)) {
	    //
	    //
	    // } else {

	      console.log(dTime);

	      that.game.tick(dTime);
	      //
	      // count += 1;
	      // rate = 40*(Math.sin(count/100)+1);

	      origin = [that.xMin, that.yMin];
	      that.draw(that.ctx, origin);
	      that.ctx.drawImage(that.game.wad.drawings[5], 1000,300, 180, 160);

	      requestAnimationFrame(update);

	    // }

	  }

	  requestAnimationFrame(update);
	};

	module.exports = View;

	//collision handling:
	//different classes, of course, floor, etc,
	//circle - airborne or on a surface
	//bounce between circle and surface will have
	//recommended outcome -
	//a surface and circle will each have an elasticity (constant)
	//also each will have a momentum (at point of impact)
	//calculated from comparing the current position to old
	//this comparison will also tell the collision calculation
	//the direction in which the collision happened, thus
	//where the bounce should go as well.
	//ball vs ball, both are redirected
	//ball vs surface, surface does not react, ball goes flying


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

	Util.prototype.magnitudeAngle = function (magnitude, angle) {

	  return [
	    magnitude * Math.sin(angle),
	    magnitude * Math.cos(angle)
	  ];

	}

	Util.prototype.distToSegmentStartEnd = function(pos, startPos, endPos) {

	  var v = {x: startPos[0], y: startPos[1]};
	  var w = {x: endPos[0], y: endPos[1]};
	  var p = {x: pos[0], y: pos[1]};

	  function sqr(x) { return x * x };
	  function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
	  function distToSegmentSquared(p, v, w) {
	    var l2 = dist2(v, w);
	    if (l2 == 0) return dist2(p, v);
	    var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
	    if (t < 0) return dist2(p, v);
	    if (t > 1) return dist2(p, w);
	    return dist2(p, { x: v.x + t * (w.x - v.x),
	                      y: v.y + t * (w.y - v.y) });
	  }

	  // function distToSegment(p, v, w) {
	    return Math.sqrt(distToSegmentSquared(p, v, w));
	  // }

	}

	Util.prototype.distToSegmentStartDelta = function(pos, startPos, dPos) {

	  var endPos = Util.prototype.vSum(startPos, dPos);

	  var v = {x: startPos[0], y: startPos[1]};
	  var w = {x: endPos[0], y: endPos[1]};
	  var p = {x: pos[0], y: pos[1]};

	  function sqr(x) { return x * x };
	  function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
	  function distToSegmentSquared(p, v, w) {
	    var l2 = dist2(v, w);
	    if (l2 == 0) return dist2(p, v);
	    var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
	    if (t < 0) return dist2(p, v);
	    if (t > 1) return dist2(p, w);
	    return dist2(p, { x: v.x + t * (w.x - v.x),
	                      y: v.y + t * (w.y - v.y) });
	  }


	  // function distToSegment(p, v, w) {
	    return Math.sqrt(distToSegmentSquared(p, v, w));
	  // }

	}

	Util.prototype.aOfV = function(vector) {
	  return Math.atan2(vector[0], vector[1]);
	}

	Util.prototype.vMag = function(vector) {
	  return Math.sqrt(
	    vector[0] * vector[0] + vector[1] * vector[1]
	  );
	}

	Util.prototype.vTimesMag = function(vector, magnitude) {
	  var angle = Util.prototype.aOfV(vector);
	  var oldMagnitude = Util.prototype.vMag(vector)
	  var newMagnitude = oldMagnitude * magnitude;
	  return Util.prototype.magnitudeAngle(newMagnitude, angle);
	  debugger;
	}


	Util.prototype.inherits = function (childClass, superClass) {

	  function Surrogate(){ }
	  Surrogate.prototype = superClass.prototype;

	  childClass.prototype = new Surrogate();
	  childClass.prototype.constructor = childClass;
	};

	module.exports = Util;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	//     keymaster.js
	//     (c) 2011-2013 Thomas Fuchs
	//     keymaster.js may be freely distributed under the MIT license.

	;(function(global){
	  var k,
	    _handlers = {},
	    _mods = { 16: false, 18: false, 17: false, 91: false },
	    _scope = 'all',
	    // modifier keys
	    _MODIFIERS = {
	      '⇧': 16, shift: 16,
	      '⌥': 18, alt: 18, option: 18,
	      '⌃': 17, ctrl: 17, control: 17,
	      '⌘': 91, command: 91
	    },
	    // special keys
	    _MAP = {
	      backspace: 8, tab: 9, clear: 12,
	      enter: 13, 'return': 13,
	      esc: 27, escape: 27, space: 32,
	      left: 37, up: 38,
	      right: 39, down: 40,
	      del: 46, 'delete': 46,
	      home: 36, end: 35,
	      pageup: 33, pagedown: 34,
	      ',': 188, '.': 190, '/': 191,
	      '`': 192, '-': 189, '=': 187,
	      ';': 186, '\'': 222,
	      '[': 219, ']': 221, '\\': 220
	    },
	    code = function(x){
	      return _MAP[x] || x.toUpperCase().charCodeAt(0);
	    },
	    _downKeys = [];

	  for(k=1;k<20;k++) _MAP['f'+k] = 111+k;

	  // IE doesn't support Array#indexOf, so have a simple replacement
	  function index(array, item){
	    var i = array.length;
	    while(i--) if(array[i]===item) return i;
	    return -1;
	  }

	  // for comparing mods before unassignment
	  function compareArray(a1, a2) {
	    if (a1.length != a2.length) return false;
	    for (var i = 0; i < a1.length; i++) {
	        if (a1[i] !== a2[i]) return false;
	    }
	    return true;
	  }

	  var modifierMap = {
	      16:'shiftKey',
	      18:'altKey',
	      17:'ctrlKey',
	      91:'metaKey'
	  };
	  function updateModifierKey(event) {
	      for(k in _mods) _mods[k] = event[modifierMap[k]];
	  };

	  // handle keydown event
	  function dispatch(event) {
	    var key, handler, k, i, modifiersMatch, scope;
	    key = event.keyCode;

	    if (index(_downKeys, key) == -1) {
	        _downKeys.push(key);
	    }

	    // if a modifier key, set the key.<modifierkeyname> property to true and return
	    if(key == 93 || key == 224) key = 91; // right command on webkit, command on Gecko
	    if(key in _mods) {
	      _mods[key] = true;
	      // 'assignKey' from inside this closure is exported to window.key
	      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = true;
	      return;
	    }
	    updateModifierKey(event);

	    // see if we need to ignore the keypress (filter() can can be overridden)
	    // by default ignore key presses if a select, textarea, or input is focused
	    if(!assignKey.filter.call(this, event)) return;

	    // abort if no potentially matching shortcuts found
	    if (!(key in _handlers)) return;

	    scope = getScope();

	    // for each potential shortcut
	    for (i = 0; i < _handlers[key].length; i++) {
	      handler = _handlers[key][i];

	      // see if it's in the current scope
	      if(handler.scope == scope || handler.scope == 'all'){
	        // check if modifiers match if any
	        modifiersMatch = handler.mods.length > 0;
	        for(k in _mods)
	          if((!_mods[k] && index(handler.mods, +k) > -1) ||
	            (_mods[k] && index(handler.mods, +k) == -1)) modifiersMatch = false;
	        // call the handler and stop the event if neccessary
	        if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch){
	          if(handler.method(event, handler)===false){
	            if(event.preventDefault) event.preventDefault();
	              else event.returnValue = false;
	            if(event.stopPropagation) event.stopPropagation();
	            if(event.cancelBubble) event.cancelBubble = true;
	          }
	        }
	      }
	    }
	  };

	  // unset modifier keys on keyup
	  function clearModifier(event){
	    var key = event.keyCode, k,
	        i = index(_downKeys, key);

	    // remove key from _downKeys
	    if (i >= 0) {
	        _downKeys.splice(i, 1);
	    }

	    if(key == 93 || key == 224) key = 91;
	    if(key in _mods) {
	      _mods[key] = false;
	      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = false;
	    }
	  };

	  function resetModifiers() {
	    for(k in _mods) _mods[k] = false;
	    for(k in _MODIFIERS) assignKey[k] = false;
	  };

	  // parse and assign shortcut
	  function assignKey(key, scope, method){
	    var keys, mods;
	    keys = getKeys(key);
	    if (method === undefined) {
	      method = scope;
	      scope = 'all';
	    }

	    // for each shortcut
	    for (var i = 0; i < keys.length; i++) {
	      // set modifier keys if any
	      mods = [];
	      key = keys[i].split('+');
	      if (key.length > 1){
	        mods = getMods(key);
	        key = [key[key.length-1]];
	      }
	      // convert to keycode and...
	      key = key[0]
	      key = code(key);
	      // ...store handler
	      if (!(key in _handlers)) _handlers[key] = [];
	      _handlers[key].push({ shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods });
	    }
	  };

	  // unbind all handlers for given key in current scope
	  function unbindKey(key, scope) {
	    var multipleKeys, keys,
	      mods = [],
	      i, j, obj;

	    multipleKeys = getKeys(key);

	    for (j = 0; j < multipleKeys.length; j++) {
	      keys = multipleKeys[j].split('+');

	      if (keys.length > 1) {
	        mods = getMods(keys);
	      }

	      key = keys[keys.length - 1];
	      key = code(key);

	      if (scope === undefined) {
	        scope = getScope();
	      }
	      if (!_handlers[key]) {
	        return;
	      }
	      for (i = 0; i < _handlers[key].length; i++) {
	        obj = _handlers[key][i];
	        // only clear handlers if correct scope and mods match
	        if (obj.scope === scope && compareArray(obj.mods, mods)) {
	          _handlers[key][i] = {};
	        }
	      }
	    }
	  };

	  // Returns true if the key with code 'keyCode' is currently down
	  // Converts strings into key codes.
	  function isPressed(keyCode) {
	      if (typeof(keyCode)=='string') {
	        keyCode = code(keyCode);
	      }
	      return index(_downKeys, keyCode) != -1;
	  }

	  function getPressedKeyCodes() {
	      return _downKeys.slice(0);
	  }

	  function filter(event){
	    var tagName = (event.target || event.srcElement).tagName;
	    // ignore keypressed in any elements that support keyboard data input
	    return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
	  }

	  // initialize key.<modifier> to false
	  for(k in _MODIFIERS) assignKey[k] = false;

	  // set current scope (default 'all')
	  function setScope(scope){ _scope = scope || 'all' };
	  function getScope(){ return _scope || 'all' };

	  // delete all handlers for a given scope
	  function deleteScope(scope){
	    var key, handlers, i;

	    for (key in _handlers) {
	      handlers = _handlers[key];
	      for (i = 0; i < handlers.length; ) {
	        if (handlers[i].scope === scope) handlers.splice(i, 1);
	        else i++;
	      }
	    }
	  };

	  // abstract key logic for assign and unassign
	  function getKeys(key) {
	    var keys;
	    key = key.replace(/\s/g, '');
	    keys = key.split(',');
	    if ((keys[keys.length - 1]) == '') {
	      keys[keys.length - 2] += ',';
	    }
	    return keys;
	  }

	  // abstract mods logic for assign and unassign
	  function getMods(key) {
	    var mods = key.slice(0, key.length - 1);
	    for (var mi = 0; mi < mods.length; mi++)
	    mods[mi] = _MODIFIERS[mods[mi]];
	    return mods;
	  }

	  // cross-browser events
	  function addEvent(object, event, method) {
	    if (object.addEventListener)
	      object.addEventListener(event, method, false);
	    else if(object.attachEvent)
	      object.attachEvent('on'+event, function(){ method(window.event) });
	  };

	  // set the handlers globally on document
	  addEvent(document, 'keydown', function(event) { dispatch(event) }); // Passing _scope to a callback to ensure it remains the same by execution. Fixes #48
	  addEvent(document, 'keyup', clearModifier);

	  // reset modifiers to false whenever the window is (re)focused.
	  addEvent(window, 'focus', resetModifiers);

	  // store previously defined key
	  var previousKey = global.key;

	  // restore previously defined key and return reference to our key object
	  function noConflict() {
	    var k = global.key;
	    global.key = previousKey;
	    return k;
	  }

	  // set window.key and window.key.set/get/deleteScope, and the default filter
	  global.key = assignKey;
	  global.key.setScope = setScope;
	  global.key.getScope = getScope;
	  global.key.deleteScope = deleteScope;
	  global.key.filter = filter;
	  global.key.isPressed = isPressed;
	  global.key.getPressedKeyCodes = getPressedKeyCodes;
	  global.key.noConflict = noConflict;
	  global.key.unbind = unbindKey;

	  if(true) module.exports = assignKey;

	})(this);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(2);

	function Wad() {

	  this.drawings = [];
	  var drawing;


	  for (var i = 2; i <= 9; i++) {
	    drawing = new Image();
	    drawing.src = './mw/' + i + '.png';
	    this.drawings.push(drawing);
	  }

	};



	module.exports = Wad;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(2);

	function Mtn(pos, parent) {
	  this.dPos = pos;
	  this.parent;
	  this.child;
	  this.parentPos;

	  // this.setParent(parent, options);
	};

	Mtn.prototype.setParent = function (parent, options) {
	  if (parent == undefined) {
	    this.parent = undefined;
	    this.parentPos = [0,0];
	    // this.pos = this.dPos;
	  } else {
	    this.parent = parent;
	    this.parentPos = parent.pos;
	    // this.pos = Util.prototype.vSum(this.parentPos, this.dPos);
	    this.parent.child = this;
	  }

	  if (options) {
	    if (options['startPos']) { this.parentPos = options['startPos']; }
	  }

	  this.pos = Util.prototype.vSum(this.parentPos, this.dPos);
	}

	Mtn.prototype.peaksAtX = function(x) {

	  if (this.pos[0] > x) {
	    return [this];
	  } else {

	    var response = this.child.peaksAtX(x);

	    if (response && response.length === 1) {

	      response.push(this);
	      return response;
	    } else {
	      return response;
	    }

	  }
	}

	Mtn.prototype.yAtX = function(x) {
	  var peaks = this.peaksAtX(x);


	  debugger;
	  var dX = x - peaks[1].pos[0];

	  //to get slope of
	  var dXtotal = peaks[0].pos[0] - peaks[1].pos[0];

	  /// rise / run
	  var slope = (peaks[0].pos[1] - peaks[1].pos[1]) / dXtotal;

	  return peaks[1].pos[1] + slope * dX;
	}

	Mtn.prototype.genRange = function (parent, options) {
	  // options is big hash with options
	  // important ones: width, direction, height
	  //
	  // higher level of abstraction - a variety of elements generated
	  // according to chaining together pre-made types of formations
	  //
	  //

	  var mtns = [];

	  for (var i = 0; i < 550; i++) {
	    var newPos = Mtn.prototype.genRandomPos(options);
	    var newMtn = new Mtn(newPos);
	    if (i > 0) { newMtn.setParent(oldMtn); }
	    else { newMtn.setParent(parent, options); }
	    mtns.push(newMtn);
	    var oldMtn = newMtn;
	  }

	  return mtns;
	};

	Mtn.prototype.FORMATIONS = {

	};

	Mtn.prototype.genRandomPos = function (prms) {
	  if (prms === undefined ) { prms = {}; }
	  if (prms['dXrng'] === undefined ) {
	      prms['dXrng'] = [ 15,40]; }
	  if (prms['dYrng'] === undefined ) {
	      prms['dYrng'] = [-20,20]; }

	  var dX = Util.prototype.random(prms['dXrng']);
	  var dY = Util.prototype.random(prms['dYrng']);

	  return [dX, dY];
	};

	Mtn.prototype.draw = function(ctx, origin) {

	  var startPos =  Util.prototype.vDiff(origin, this.parentPos);
	  var endPos =    Util.prototype.vDiff(origin, this.pos);

	  // ctx.beginPath();
	  // ctx.moveTo(startPos[0], startPos[1]);
	  ctx.lineTo(endPos[0], endPos[1]);
	  // ctx.stroke();

	};

	// Mtn.prototype.

	module.exports = Mtn;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Mtn = __webpack_require__(5);
	var Util = __webpack_require__(2);
	var MtnRange = __webpack_require__(7);
	var Group = __webpack_require__(8);
	var Wad = __webpack_require__(4);
	var Point = __webpack_require__(9);
	// var

	function Game() {

	  this.world = new Group();;
	}

	Game.prototype.startWorld = function(options) {


	  // debugger;

	  this.wad = new Wad();

	  var p = new Point();
	  var pp = new Point();
	  var ppp = new Point();
	  var pppp = new Point();
	  //
	  this.world.addChild(p);
	  //
	  this.world.addChild(pp);
	  this.world.addChild(ppp);
	  this.world.addChild(pppp);

	  p.dPos =   [30,0];
	  pp.dPos =  [100,100];
	  ppp.dPos = [20,100];
	  pppp.dPos = [0,0];


	  this.rightArm = new Group();
	  this.rightArm.dPos = [100,100];

	  var r1 = new Point();
	  var r2 = new Point();
	  var r3 = new Point();
	  var r4 = new Point();
	  r1.dPos = [-40,-20];
	  r2.dPos = [-40,100];
	  r3.dPos = [100,200];
	  r4.dPos = [100,-20];

	  this.rightArm.addChild(r1);
	  this.rightArm.addChild(r2);
	  this.rightArm.addChild(r3);
	  this.rightArm.addChild(r4);

	  debugger;

	  // this.world.addChild(rightArm);

	  this.total = 0;

	};

	Game.prototype.tick = function(dT) {

	  //check for collisions   ??
	  //check for other events ??
	  // actually just listeners for this?

	  this.rightArm.move(dT);
	  this.world.move(dT);

	};

	Game.prototype.draw = function (ctx, origin) {

	  this.world.draw(ctx, origin);
	  this.rightArm.draw(ctx, origin);
	  ctx.lineJoin = 'bevel';

	};

	module.exports = Game;


	//mtn ranges to draw


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(2);
	var Mtn = __webpack_require__(5);

	function MtnRange(view, options) {

	  this.origin = [0,0];
	  this.nodes = [];
	  this.view = view

	  this.fill = 'black';
	  this.fillStatus = 'line-only';
	  this.lineColor = 'green';
	  this.lineSize = 5;

	  this.regenerating = {
	    minPct: 0.5,
	    maxPct: 1
	  };

	  if (this.regenerating) {
	    this.startRng();
	  }

	};

	MtnRange.prototype.startRng = function() {

	  debugger;

	  var minX = this.view.xMin;
	  var minY = this.view.yMin;
	  var maxX = this.view.xRng + minX;
	  var maxY = this.view.yRng + minY;
	  var originPos = this.origin;
	  var parent;

	  var x = minX - (this.view.xRng * this.regenerating.minPct);
	  var mostRecent = newMtn();
	  var mostRecentPos = this.origin;

	  while (x < maxX + this.view.xRng * this.regenerating.minPct) {



	    debugger;
	    finalPos = Util.prototype.vSum(
	      Mtn.prototype.genRandomPos(),
	      mostRecentPos
	    );

	    if (mostRecentPos === this.origin) { parent = undefined }
	    toAdd = newMtn(finalPos, originPos);

	    this.nodes.push(mostRecent);

	  }

	}

	MtnRange.prototype.regen = function() {


	  var minY = this.view.minX;
	  var mixY = this.view.minY;
	  var maxX = this.view.xRng - minX;
	  var maxY = this.view.yRng - minX;

	}

	MtnRange.prototype.draw = function (ctx) {

	  ctx.beginPath();

	  for (var i = 0; i < this.nodes.length; i++) {
	    this.nodes[i].tracePath(ctx);
	  }

	  if (ctx.fill) {
	    ctx.fillStyle = this.fill;
	    this.setupFill(ctx);
	    ctx.fill();
	  }


	  ctx.stroke();


	};

	module.exports = MtnRange;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(2).prototype;
	// var Circle = require('./circle.js');
	// var Point = require('./point.js');

	function Group(options) {
	  // parent can be position(global level) or another group


	  this.children = [];
	  this.points = [];
	  this.circles = [];

	  this.dPos = [0,0];
	  this.velocity = [0,0];
	  this.acceleration = [0,0];

	  this.childrenAngle = 0;
	  this.childrenSpin = 0;

	  this.lines = {
	    fromOrigin: false,
	    //ctx.strokeStyle
	    color: 'black',
	    //ctx.lineWidth
	    width: '5',

	    connectEnds: true,
	  };

	  this.fill = {
	    filled: false,
	    //
	    fillMode: 'object',
	  };

	}

	Group.prototype.resetPositionCache = function() {
	  this.worldPos = undefined;
	  this.worldAngle = undefined;

	  (this.points.concat(this.circles).concat(this.children)).forEach(function(kid) {
	    kid.resetPositionCache();
	  });
	}

	Group.prototype.setOrigin = function(newOrigin) {
	  this.origin = newOrigin;
	  if (newOrigin) {
	    switch(this.__proto__.constructor.name) {
	      case 'Point':
	        newOrigin.points.push(this);
	        break;
	      case 'Group':
	        newOrigin.children.push(this);
	        break;
	      case 'Circle':
	        newOrigin.circles.push(this);
	        break;
	    };
	  }
	};

	Group.prototype.addChild = function(child) {
	  child.setOrigin.call(child, this);
	}

	Group.prototype.removeChild = function(child) {

	  switch(child.__proto__.constructor.name) {
	    case 'Point':
	      var i = this.points.indexOf(child);
	      if(i > -1) { this.points.splice(i, 1); }
	      break;
	    case 'Group':
	      var i = this.children.indexOf(child);
	      if(i > -1) { this.children.splice(i, 1); }
	      break;
	    case 'Circle':
	      var i = this.circles.indexOf(child);
	      if(i > -1) { this.circles.splice(i, 1); }
	      break;
	  }

	  child.setOrigin();

	}

	Group.prototype.screenPos = function (viewPos) {

	  if (!viewPos) { viewPos = [0,0]; }
	  if (!this.origin) {

	    return Util.vDiff(
	      viewPos,
	      this.anglePos()
	    );
	  } else {
	    return Util.vSum(
	      this.origin.screenPos(viewPos),
	      this.anglePos()
	    );
	  }
	}

	Group.prototype.angleOfDPos = function () {
	  if (!this.originalAngle) {
	    this.originalAngle = Util.aOfV(this.dPos);
	  }
	  return this.originalAngle;
	}

	Group.prototype.screenAngle = function () {

	  if (!this.origin) {
	    return 0;
	  } else {
	    return this.origin.childrenAngle + this.origin.screenAngle();
	  }

	}

	Group.prototype.move = function(dT) {



	  var dVelocity = Util.vTimesMag(this.acceleration, dT);
	  // debugger;
	  debugger;
	  this.velocity = Util.vSum(this.velocity, dVelocity);
	  // newVelocity[0] += 1;

	  this.oldDPos = this.dPos;
	  this.oldChildrenAngle = this.childrenAngle;

	  if (this.childrenSpin) {
	    this.childrenAngle += (this.childrenSpin * dT);
	    // this.resetPositionCache();
	  }

	  if (this.velocity) {
	    var dDPos = Util.vTimesMag(this.velocity, dT);
	    this.dPos = Util.vSum(this.dPos, dDPos);
	    // this.resetPositionCache();
	  }

	}

	Group.prototype.anglePos = function() {

	  var angle = this.angleOfDPos() + this.screenAngle();
	  var magnitude = Util.vMag(this.dPos);

	  return Util.magnitudeAngle(magnitude, angle);
	}

	Group.prototype.draw = function(ctx, origin) {

	  //set up order specification?
	  debugger;
	  this.drawLines(ctx, origin);
	  this.drawCircles(ctx, origin);
	  this.drawChildren(ctx, origin);


	  this.pointCoordinates();

	}

	Group.prototype.pointCoordinates = function(origin) {
	  if (!origin) { origin = [0,0]; }
	  var that = this;
	  // debugger;
	  return this.points.map(function(point) {
	    return point.screenPos(origin);
	  });
	}

	Group.prototype.drawCircles = function(ctx, origin) {

	}

	Group.prototype.drawLines = function(ctx, origin) {

	  // debugger;

	  var points = this.pointCoordinates(origin);

	  ctx.beginPath();
	  ctx.lineWidth = this.lines.width;
	  ctx.strokeStyle = this.lines.color;

	  for (var i = 0; i < points.length; i++) {
	    var pos = points[i];
	    if (i == 0) {
	      ctx.moveTo(pos[0], pos[1]);
	    } else {
	      ctx.lineTo(pos[0], pos[1]);
	    }
	  }

	  if (this.points.length && this.lines.connectEnds) {
	    ctx.lineTo(points[0][0], points[0][1]);
	  }

	  ctx.stroke();
	}

	Group.prototype.drawChildren = function(ctx, origin) {
	  this.children.forEach(function(child) {
	    child.draw(ctx, origin);
	  })
	}

	Group.prototype.collides = function(otherGroup) {
	  var otherGroupPoints = otherGroup.pointCoordinates();
	  var ownPoints = this.pointCoordinates();

	  var final = this.lines.connectEnds ?
	    ownPoints.length : ownPoints.length - 1;

	  for (var i = 0; i < ownPoints.length; i++) {
	    var lineStart = ownPoints[i];
	    var lineEnd = ownPoints[(i + 1) % ownPoints.length];

	    for (var j = 0; j < otherGroupPoints.length; j++) {
	      distance = Util.distToSegmentStartEnd(
	        otherGroupPoints[j],
	        lineStart,
	        lineEnd
	      );
	      if (distance < 5) { return true; }
	    }

	  }

	  return false;


	}


	module.exports = Group;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Group = __webpack_require__(8);
	var Util = __webpack_require__(2);

	function Point(options){

	  Group.call(this, options);
	}


	Util.prototype.inherits(Point, Group);

	Point.prototype.startDrawing = function(ctx, origin) {
	  ctx.beginPath();
	  ctx.lineWidth = this.lines.width;
	  ctx.strokeStyle = this.lines.color;

	  var screenPos = this.screenPos(origin);
	  ctx.moveTo(screenPos[0], screenPos[1]);
	}

	Point.prototype.finishDrawing = function (ctx, origin, finalPos) {
	  var screenPos = this.screenPos(origin);
	  ctx.lineTo(screenPos[0], screenPos[1]);
	  if (finalPos) { ctx.lineTo(finalPos[0], finalPos[1]); }
	  ctx.stroke();
	};

	Point.prototype.draw = function(ctx, origin) {
	  var screenPos = this.screenPos(origin);
	  ctx.lineTo(screenPos[0], screenPos[1]);
	}

	module.exports = Point;


/***/ }
/******/ ]);