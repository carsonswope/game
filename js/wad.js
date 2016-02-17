var Util = require('./util.js');
var Circle = require('./circle.js');

function Wad(options) {

  this.drawings = [];
  var drawing;

  this.count = 0;

  for (var i = 2; i <= 8; i++) {
    drawing = new Image();
    drawing.src = './mw/' + i + '.png';
    this.drawings.push(drawing);
  }

  Circle.call(this, options);

};

Util.prototype.inherits(Wad, Circle);

Wad.prototype.move = function(dT) {

  this.count += 1;
  this.drawingNumber = Math.floor(((this.count / 6) % (this.drawings.length -1)))

}

Wad.prototype.draw = function(ctx, origin){

  var x = this.dPos[0];
  var y = this.dPos[0];

  ctx.drawImage(this.drawings[this.drawingNumber], 1000,500,180,160);

}



module.exports = Wad;
