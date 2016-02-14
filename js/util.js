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

Util.prototype.aOfV = function(vector) {
  return Math.atan2(vector[0], vector[1]);
}

Util.prototype.vMag = function(vector) {
  return Math.sqrt(
    vector[0] * vector[0] + vector[1] * vector[1]
  );
}
module.exports = Util;
