var Group = require('./group.js');
var Util = require('./util.js');

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
