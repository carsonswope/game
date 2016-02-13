var View = require('./view.js');
var Mtn = require('./mountain.js');
var Game = require('./game.js');
var MtnRange = require('./mtnRange.js');

$(function() {

  var canvasEl = document.getElementsByTagName("canvas")[0];

  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight - 4;

  var game = new Game();

  // console.log(Mtn.prototype.genRandom());

  new View(canvasEl, game);

});
