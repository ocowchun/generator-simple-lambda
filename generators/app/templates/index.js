var run = require('./lib/index.js').default;

exports.handler = function(event, context) {
	run(function(data) {
		context.succeed(data);
	});
}
