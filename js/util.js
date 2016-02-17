

function Util() {
};

Util.prototype.random = function(min, max) {

  //handle 2d array acting as range
  if (min.__proto__.constructor.name === "Array") {
    max = min[1];
    min = min[0];
  }

  return Math.random() * (max-min) + min;

};

Util.prototype.dist = function(v1, v2) {
  var a = v1[0] - v2[0];
  var b = v1[1] - v2[1];
  return Math.sqrt(
    a * a + b * b
  );
}


Util.prototype.vSum = function(end, start) {
  if (start == undefined) { start = [0,0]; }

  return [start[0] + end[0], start[1] + end[1]];
}

Util.prototype.vDiff = function(origin, pos){
  return [pos[0] - origin[0], pos[1] - origin[1]];
}

Util.prototype.magnitudeAngle = function (magnitude, angle) {

  return [
    magnitude * Math.sin(angle),
    magnitude * Math.cos(angle)
  ];

}

Util.prototype.distToSegmentStartEnd = function(pos, startPos, endPos) {

  var v = {x: startPos[0], y: startPos[1]};
  var w = {x: endPos[0], y: endPos[1]};
  var p = {x: pos[0], y: pos[1]};

  function sqr(x) { return x * x };
  function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
  function distToSegmentSquared(p, v, w) {
    var l2 = dist2(v, w);
    if (l2 == 0) return dist2(p, v);
    var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    if (t < 0) return dist2(p, v);
    if (t > 1) return dist2(p, w);
    return dist2(p, { x: v.x + t * (w.x - v.x),
                      y: v.y + t * (w.y - v.y) });
  }

  // function distToSegment(p, v, w) {
    return Math.sqrt(distToSegmentSquared(p, v, w));
  // }

}

Util.prototype.distToSegmentStartDelta = function(pos, startPos, dPos) {

  var endPos = Util.prototype.vSum(startPos, dPos);

  var v = {x: startPos[0], y: startPos[1]};
  var w = {x: endPos[0], y: endPos[1]};
  var p = {x: pos[0], y: pos[1]};

  function sqr(x) { return x * x };
  function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
  function distToSegmentSquared(p, v, w) {
    var l2 = dist2(v, w);
    if (l2 == 0) return dist2(p, v);
    var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    if (t < 0) return dist2(p, v);
    if (t > 1) return dist2(p, w);
    return dist2(p, { x: v.x + t * (w.x - v.x),
                      y: v.y + t * (w.y - v.y) });
  }


  // function distToSegment(p, v, w) {
    return Math.sqrt(distToSegmentSquared(p, v, w));
  // }

}

Util.prototype.aOfV = function(vector) {
  return Math.atan2(vector[0], vector[1]);
}

Util.prototype.vMag = function(vector) {
  return Math.sqrt(
    vector[0] * vector[0] + vector[1] * vector[1]
  );
}

Util.prototype.vTimesMag = function(vector, magnitude) {
  var angle = Util.prototype.aOfV(vector);
  var oldMagnitude = Util.prototype.vMag(vector)
  var newMagnitude = oldMagnitude * magnitude;
  return Util.prototype.magnitudeAngle(newMagnitude, angle);
}


Util.prototype.inherits = function (childClass, superClass) {

  function Surrogate(){ }
  Surrogate.prototype = superClass.prototype;

  childClass.prototype = new Surrogate();
  childClass.prototype.constructor = childClass;
};

module.exports = Util;
