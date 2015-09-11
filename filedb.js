'use strict';

var fs = require('fs');


exports.load = function(filename, cb) {
	fs.readFile(filename, function(err, dataBuffer) {
		if (err) {
			console.log("err: " + err);
			cb({});
			return;
		}
		cb(JSON.parse(dataBuffer));
	});
};
exports.save = function(filename, data, cb) {
	fs.writeFile(filename, JSON.stringify({"list":data}), function(err, dataBuffer) {
		if (err) {
			console.log("err: " + err);
			cb("Failed");
			return;
		}
		cb("Success");
	});
};


