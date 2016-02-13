var Util = require('./util.js');

function Group() {
  // parent can be position(global level) or another group
  this.origin;
  this.dPos;

  this.nodes = [];
  this.children = [];

  this.angle;

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
  if (!this.origin) {
    return Util.prototype.vDiff(
      viewPos,
      this.dPos
    );
  } else {
    return Util.prototype.vSum(
      this.dPos,
      this.origin.screenPos(viewPos)
    );
  }
}

Group.prototype.draw = function() {

}

module.exports = Group;
