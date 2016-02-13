function Group() {
  // parent can be position(global level) or another group
  this.origin;
  this.relativePos;

  this.nodes = [];
  this.children = [];

  this.angle;

  this.material = {};
  this.solid = {};

  this.generate;
  this.regenerating;

}

Group.prototype.hi = function() {console.log('hi');};

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
  this.children.remove(child);
  child.setOrigin();
}

Group.prototype.draw = function() {

}

module.exports = Group;
