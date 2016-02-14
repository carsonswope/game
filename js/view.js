/* globals $ */

var Util = require('./util.js');
var Key = require('./keymaster.js');
var Wad = require('./wad.js');

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
  debugger;

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
  var count = 0;

  var update = function() {

    var l = that.game.world.children.length-1
    that.game.world.children[l].childrenAngle -= 0.01;
    that.game.world.childrenAngle += 0.01;
    that.game.world.children[l].children[2].childrenAngle += 0.5;

    that.draw();
    count += 1;

    debugger;

    rate = 40*(Math.sin(count/100)+1);

    that.ctx.drawImage(that.game.wad.drawings[Math.floor(rate) % 5], 1000,300, 180, 160);

    requestAnimationFrame(update);

  }

  requestAnimationFrame(update);
};

module.exports = View;
