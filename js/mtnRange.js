var Util = require('./util.js');
var Mtn = require('./mountain.js');

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
