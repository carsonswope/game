var Mtn = require('./mountain.js');
var Util = require('./util.js');
var MtnRange = require('./mtnRange.js');
var Group = require('./group.js');
var Wad = require('./wad.js');
var Point = require('./point.js');
var Circle = require('./circle.js');
// var

function Game() {
  this.items = [];
}

Game.prototype.startWorld = function(options) {

  wad = new Wad();
  wad.dPos = [-500,0];

  world = new Group();

  var p =  new Point();
  var pp = new Point();

  p.dPos = [-400,150];
  pp.dPos = [400,150];

  world.addChild(p);
  world.addChild(pp);

  c = new Circle();
  c.radius = 74;
  c.velocity = [0.0, -0.8];
  this.items.push(c);


  rightArm = new Group();
  rightArm.dPos = [-100,-100];

  var r1 = new Point();
  var r2 = new Point();
  var r3 = new Point();
  var r4 = new Point();
  r1.dPos = [-40,-20];
  r2.dPos = [-40,100];
  r3.dPos = [100,200];
  r4.dPos = [100,-20];

  rightArm.addChild(r1);
  rightArm.addChild(r2);
  rightArm.addChild(r3);
  rightArm.addChild(r4);

  // this.items.push(rightArm);
  this.items.push(world);
  // this.items.push(wad);

};

Game.prototype.GRAVITY = [0, 0.00098];
Game.prototype.NEGATIVE_GRAVITY = [0, -0.00098];

Game.prototype.tick = function(dT) {

  //check for collisions   ??
  //check for other events ??
  // actually just listeners for this?

  var collisions = [];

  for (var i = 0; i < this.items.length; i++) {
    for (var j = i + 1; j < this.items.length; j++) {

      if (this.items[i].collides(this.items[j])) {
        collisions.push([this.items[i], this.items[j]]);
      }

    }
  }

  for (var i = 0; i < collisions.length; i++) {
    //



    collisions[i][0].velocity = [
      0, -collisions[i][0].velocity[1]*0.95
    ];

    collisions[i][0].velocity = Util.prototype.vSum(
      Util.prototype.vTimesMag(this.NEGATIVE_GRAVITY, dT),
      collisions[i][0].velocity
    );

  }

  for (var i = 0; i < this.items.length; i++) {
    this.items[i].move(dT);
  }

};

Game.prototype.draw = function (ctx, origin) {

  for (var i = 0; i < this.items.length; i++) {
    this.items[i].draw(ctx, origin);
  }

  ctx.lineJoin = 'bevel';

};

module.exports = Game;


//mtn ranges to draw
