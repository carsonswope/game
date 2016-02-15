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

  that.game.world.childrenAngle = Math.PI;
  var count = 0;

  var update = function() {

    // that.game.world.children[0].childrenAngle -= 0.04;
    that.game.world.childrenAngle += 0.02;
    that.game.rightArm.childrenAngle += 0.01;

    that.draw();

    if (that.game.world.collides(that.game.rightArm) ||
        that.game.rightArm.collides(that.game.world)) {


    } else {

      count += 1;

      rate = 40*(Math.sin(count/100)+1);

      that.ctx.drawImage(that.game.wad.drawings[Math.floor(rate) % 5], 1000,300, 180, 160);

      requestAnimationFrame(update);

    }

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
