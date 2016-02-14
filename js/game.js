var Mtn = require('./mountain.js');
var Util = require('./util.js');
var MtnRange = require('./mtnRange.js');
var Group = require('./group.js');

function Game() {

  this.world = new Group();;
}

Game.prototype.startWorld = function(options) {


  // debugger;

  var p = new Group();
  var pp = new Group();
  var ppp = new Group();

  this.world.addChild(p);
  this.world.addChild(pp);
  this.world.addChild(ppp);

  p.dPos =   [100,0];
  pp.dPos =  [100,100];
  ppp.dPos = [0,100];

};

Game.prototype.draw = function (ctx, origin) {

  this.world.draw(ctx, origin);

};

module.exports = Game;


//mtn ranges to draw
