var Util = require('./util.js').prototype;

function Group() {
  // parent can be position(global level) or another group
  this.dPos = [0,0];
  this.children = [];
  this.childrenAngle = 0;

  this.material = {};
  this.solid = {};

  this.generate;
  this.regenerating;

}

Group.prototype.setOrigin = function(newOrigin) {
  this.origin = newOrigin;
  if (newOrigin) {
    newOrigin.children.push(this);
  }
};

Group.prototype.addChild = function(child) {
  child.setOrigin.call(child, this);
}

Group.prototype.removeChild = function(child) {

  var i = this.children.indexOf(child);
  if (i > -1) { this.children.splice(i, 1); }

  child.setOrigin();
}

Group.prototype.screenPos = function (viewPos) {

  if (!viewPos) { viewPos = [0,0]; }
  if (!this.origin) {

    return Util.vDiff(
      viewPos,
      this.anglePos()
    );
  } else {
    return Util.vSum(
      this.origin.screenPos(viewPos),
      this.anglePos()
    );
  }
}

Group.prototype.angleOfDPos = function () {
  if (!this.originalAngle) {
    this.originalAngle = Util.aOfV(this.dPos);
  }
  return this.originalAngle;
}

Group.prototype.screenAngle = function () {
  if (!this.origin) {
    return 0;
  } else {
    return this.origin.childrenAngle + this.origin.screenAngle();
  }

}

Group.prototype.anglePos = function() {

  var angle = this.angleOfDPos() + this.screenAngle();
  var magnitude = Util.vMag(this.dPos);

  return Util.magnitudeAngle(magnitude, angle);
}

Group.prototype.draw = function(ctx, origin) {

  //can be 'point' or 'child'
  var drawMode = 'child';

  for (var i = 0; i < this.children.length; i++) {

    var kid = this.children[i];
    var kidPos = kid.screenPos(origin);

    ctx.color = 'black';

    if (!kid.children.length) {

      if (drawMode == 'child') {

        drawMode = 'point';
        ctx.beginPath();
        ctx.moveTo(kidPos[0], kidPos[1]);

      } else {

        ctx.lineTo(kidPos[0], kidPos[1]);
        if (i + 1 === this.children.length ) {
          ctx.stroke();
        }

      }

    } else {

      if (drawMode == 'point') {
        drawMode = 'child';
        ctx.stroke;
        ctx.stroke();
      }
      kid.draw(ctx);

    }
  }
}

Group.prototype.finishDrawing = function (ctx) {


};

module.exports = Group;
