var Group = require('./group.js');
var Util = require('./util.js').prototype;

function Circle(options){

  this.radius = 0;
  this.dPos = [0,0];

  Group.call(this, options);

  this.state.inAir = true;

}

Util.inherits(Circle, Group);

Circle.prototype.draw = function(ctx, origin) {

  var pos = this.screenPos(origin)

  ctx.beginPath();

  ctx.arc(pos[0], pos[1], this.radius, 0, Math.PI * 2);
  ctx.stroke();

}

module.exports = Circle;
