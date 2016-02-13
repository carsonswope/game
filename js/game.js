var Mtn = require('./mountain.js');
var Util = require('./util.js');
var MtnRange = require('./mtnRange.js');

function Game() {

  this.mtnRanges = [];
  // this.Mtn = Mtn.prototype;

  // this.startWorld();

  // debugger;
  this.mtns = this.mtnRanges.push(Mtn.prototype.genRange(undefined, {startPos: [0, -20]}));
  // debugger;
  this.mtns = this.mtnRanges.push(Mtn.prototype.genRange(undefined, {startPos: [0, 150]}));
  // this.mtns = this.mtnRanges.push(Mtn.prototype.genRange({dYrng: []}));

  //[mtnRange ]
}

Game.prototype.startWorld = function(options) {

  // debugger;

  var range = new MtnRange(this.view);

  // var defaults = {
  //   worldOrigin: [0,0]
  // };
  //
  // if (!options) { options = {}; }
  //
  // var prms = defaults.extend(options);



};

Game.prototype.draw = function (ctx, origin) {

  for (var i = 0; i < this.mtnRanges.length; i++) {

    // origin[1] -= 100;

    var range = this.mtnRanges[i];
    var start = undefined;
    var num = 0;
    for (var j = 0; j < range.length; j++) {

      var mtnPos = range[j].pos;


      if (start == undefined) {
        if (mtnPos[0] > origin[0]) { start = j }
      } else if (mtnPos[0] < origin[0] + ctx.width) {
        num += 1;

      }

    }

    var toDrawRange = [];

    for (var m = start; m <= start+num+1; m++) {
      toDrawRange.push(range[m]);
    }

    ctx.beginPath();

    ctx.fillStyle = "#" + "1" + "2" + (i*4);

    // debugger;

    var startPoint = Util.prototype.vDiff(origin, toDrawRange[0].parentPos);

    ctx.moveTo(startPoint[0], startPoint[1]);

    for (var k = 0; k < toDrawRange.length; k++) {
      toDrawRange[k].draw(ctx, origin);
    }

    ctx.lineTo(ctx.width, ctx.height);
    ctx.lineTo(0, ctx.height);


    ctx.fill();

  }

};

module.exports = Game;


//mtn ranges to draw
