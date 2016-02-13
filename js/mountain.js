var Util = require('./util.js');

function Mtn(pos, parent) {
  this.dPos = pos;
  this.parent;
  this.child;
  this.parentPos;

  // this.setParent(parent, options);
};

Mtn.prototype.setParent = function (parent, options) {
  if (parent == undefined) {
    this.parent = undefined;
    this.parentPos = [0,0];
    // this.pos = this.dPos;
  } else {
    this.parent = parent;
    this.parentPos = parent.pos;
    // this.pos = Util.prototype.vSum(this.parentPos, this.dPos);
    this.parent.child = this;
  }

  if (options) {
    if (options['startPos']) { this.parentPos = options['startPos']; }
  }

  this.pos = Util.prototype.vSum(this.parentPos, this.dPos);
}

Mtn.prototype.peaksAtX = function(x) {

  if (this.pos[0] > x) {
    return [this];
  } else {

    var response = this.child.peaksAtX(x);

    if (response && response.length === 1) {

      response.push(this);
      return response;
    } else {
      return response;
    }

  }
}

Mtn.prototype.yAtX = function(x) {
  var peaks = this.peaksAtX(x);


  debugger;
  var dX = x - peaks[1].pos[0];

  //to get slope of
  var dXtotal = peaks[0].pos[0] - peaks[1].pos[0];

  /// rise / run
  var slope = (peaks[0].pos[1] - peaks[1].pos[1]) / dXtotal;

  return peaks[1].pos[1] + slope * dX;
}

Mtn.prototype.genRange = function (parent, options) {
  // options is big hash with options
  // important ones: width, direction, height
  //
  // higher level of abstraction - a variety of elements generated
  // according to chaining together pre-made types of formations
  //
  //

  var mtns = [];

  for (var i = 0; i < 550; i++) {
    var newPos = Mtn.prototype.genRandomPos(options);
    var newMtn = new Mtn(newPos);
    if (i > 0) { newMtn.setParent(oldMtn); }
    else { newMtn.setParent(parent, options); }
    mtns.push(newMtn);
    var oldMtn = newMtn;
  }

  return mtns;
};

Mtn.prototype.FORMATIONS = {

};

Mtn.prototype.genRandomPos = function (prms) {
  if (prms === undefined ) { prms = {}; }
  if (prms['dXrng'] === undefined ) {
      prms['dXrng'] = [ 15,40]; }
  if (prms['dYrng'] === undefined ) {
      prms['dYrng'] = [-20,20]; }

  var dX = Util.prototype.random(prms['dXrng']);
  var dY = Util.prototype.random(prms['dYrng']);

  return [dX, dY];
};

Mtn.prototype.draw = function(ctx, origin) {

  var startPos =  Util.prototype.vDiff(origin, this.parentPos);
  var endPos =    Util.prototype.vDiff(origin, this.pos);

  // ctx.beginPath();
  // ctx.moveTo(startPos[0], startPos[1]);
  ctx.lineTo(endPos[0], endPos[1]);
  // ctx.stroke();

};

// Mtn.prototype.

module.exports = Mtn;
