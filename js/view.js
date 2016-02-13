/* globals $ */

var Util = require('./util.js');
var Key = require('./keymaster.js');

function View(canvas, game) {

  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.xMin = 0;
  this.yMin = -canvas.height / 1.5;
  this.xRng = canvas.width;
  this.yRng = canvas.height;
  this.ctx.width = this.xRng;
  this.ctx.height = this.yRng;
  this.dOrigin = [0,0];

  this.game = game;
  this.game.view = this;
  this.game.startWorld();

  this.draw();

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
  this.draw();
  // debugger

  function update() {

    that.updateKeys();

    var scale = 20;
    that.xMin += that.dOrigin[0] * scale;
    that.yMin += that.dOrigin[1] * scale;

    that.draw();

    var x = that.xMin + 600;

    // debugger;
    var y = that.game.mtnRanges[0][0].yAtX(x);


    that.ctx.beginPath();
    that.ctx.fillStyle = "green";
    that.ctx.arc(x - that.xMin, y - that.yMin,8,0, Math.PI * 2);
    that.ctx.fill();


    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
};

module.exports = View;
