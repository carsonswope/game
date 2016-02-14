// var GrpNode = require('./grpNode.js');
var Group = require('./group.js');



debugger;

p = new Group();
p.dPos = [0,0];

pp = new Group();
pp.dPos = [0,1];

ppp = new Group();
ppp.dPos = [0,1];

pp.setOrigin(p);
ppp.setOrigin(pp);

pp.childrenAngle = Math.PI/2;
p.childrenAngle = Math.PI/2;

debugger;
