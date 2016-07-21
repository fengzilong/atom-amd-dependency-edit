var loophole = require('loophole');
var allowUnsafeNewFunction = loophole.allowUnsafeNewFunction;
var falafel;

allowUnsafeNewFunction(function() {
	falafel = require('falafel');
});

module.exports = falafel;
