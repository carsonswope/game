var Mtn = require('./mountain.js');
var Util = require('./util.js');
var MtnRange = require('./mtnRange.js');
var Group = require('./group.js');
var Wad = require('./wad.js');

function Game() {

  this.world = new Group();;
}

Game.prototype.startWorld = function(options) {


  // debugger;

  this.wad = new Wad();

  var p = new Group();
  var pp = new Group();
  var ppp = new Group();
  var pppp = new Group();

  // var pppp = new Group();
  //
  this.world.addChild(p);
  //
  this.world.addChild(pp);
  this.world.addChild(ppp);
  this.world.addChild(pppp);


  var rightArm = new Group();
  rightArm.dPos = [100,100];

  var r1 = new Group();
  var r2 = new Group();
  r1.dPos = [0,0];
  r2.dPos = [0,200];

  rightArm.addChild(r1);
  rightArm.addChild(r2);

  var rightForeArm = new Group();
  rightForeArm.dPos = [0,200];
  var rr1 = new Group();
  var rr2 = new Group();
  rr1.dPos = [0,0];
  rr2.dPos = [40,40];

  rightForeArm.addChild(rr1);
  rightForeArm.addChild(rr2);

  this.world.addChild(rightArm);

  rightArm.addChild(rightForeArm);

  p.dPos =   [100,0];
  pp.dPos =  [100,100];
  ppp.dPos = [0,100];
  pppp.dPos = [0,0];

  this.total = 0;

};

Game.prototype.draw = function (ctx, origin) {

  this.world.draw(ctx, origin);
  ctx.lineJoin = 'bevel';

};

module.exports = Game;


//mtn ranges to draw
