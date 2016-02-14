var Util = require('./util.js');

function Wad() {

  this.drawings = [];
  var drawing;


  for (var i = 2; i <= 9; i++) {
    drawing = new Image();
    drawing.src = './mw/' + i + '.png';
    this.drawings.push(drawing);
  }

};



module.exports = Wad;
