var Mtn = require('./mountain.js');
var Util = require('./util.js');
var MtnRange = require('./mtnRange.js');
var Group = require('./group.js');
var Wad = require('./wad.js');
var Point = require('./point.js');
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
