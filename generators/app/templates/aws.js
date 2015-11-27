var AWS = require('aws-sdk');
var fs = require('fs');
var config = require('./config');

AWS.config.update({
	region: config.AWS_REGION
});

var lambda = new AWS.Lambda({
	apiVersion: '2015-03-31'
});

var FUNCTION_NAME = config.FUNCTION_NAME;
var IAM_ROLE = config.IAM_ROLE;
var DESCRIPTION = config.DESCRIPTION;

function getZipFile() {
	return fs.readFileSync('dist/build.zip');
}

function createFunction() {
	var params = {
		Code: {
			ZipFile: getZipFile()
		},
		FunctionName: FUNCTION_NAME,
		/* required */
		Handler: 'index.handler',
		/* required */
		Role: IAM_ROLE,
		/* required */
		Runtime: 'nodejs',
		/* required */
		Description: DESCRIPTION,
		MemorySize: 128,
		Publish: true,
		Timeout: 3
	};

	lambda.createFunction(params, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else console.log(data); // successful response
	});
}

function updateFunctionCode() {
	var params = {
		FunctionName: FUNCTION_NAME,
		/* required */
		Publish: true,
		ZipFile: getZipFile()
	};
	lambda.updateFunctionCode(params, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else console.log(data); // successful response
	});
}

function invoke() {
	var params = {
		FunctionName: FUNCTION_NAME
	};

	lambda.invoke(params, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else console.log(data); // successful response
	});
}

module.exports.createFunction = createFunction;
module.exports.updateFunctionCode = updateFunctionCode;
module.exports.invoke = invoke;