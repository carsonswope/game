function Group() {
  // parent can be position(global level) or another group
  this.origin;
  this.nodes = [];
  this.children = [];
  this.angle;
  this.material = {};
  this.solid = {};


}

module.exports = Group;
