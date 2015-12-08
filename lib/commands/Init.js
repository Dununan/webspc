/**
 * Initialize new project
**/
var fs = require('fs');
var prompt = require('prompt');
var Utils = require('./../Utils');


var Init = function () {
	this.getUserInput();
}

Init.prototype.getUserInput = function() {
	prompt.start();
	prompt.message = "";
	prompt.delimiter = "";

	var property = {
		name: 'yesno',
		message: 'Do you like this?'.cyan,
		validator: /y[es]*|n[o]?/,
		warning: 'Must respond yes or no'.red,
		default: 'y'
	};

	prompt.get(property, function (err, result) {
		if(Utils.yesnoBoolean(result.yesno)) {
			console.log('Thank You!'.green);
		} else {
			console.log(':('.red);
		}

	});
}


module.exports = Init; 