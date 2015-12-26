var test = require("tape");
var makeymaker = require("../src/makeymaker.js");

test('Makey Maker test', function(t) {
  t.plan(2);
  var mm = makeymaker.factory();
  t.equal(typeof mm, "object");
  t.equal(mm.version(), "1.0.0");
});
