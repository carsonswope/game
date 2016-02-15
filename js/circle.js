var Group = require('./group.js');
var Util = require('./util.js').prototype;

function Circle(){

  Group.call(this, options);
}

Util.inherits(Circle, Group);

module.exports = Circle;
