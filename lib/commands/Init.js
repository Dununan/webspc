/**
 * Initialize new project
**/
var fs = require('fs');
var prompt = require('prompt');
var Utils = require('./../Utils');


var Init = function () {
	this.props = {
		name: "",
		makeFolder: false,
		title: "",
		domain: "",
		assetsPath: "",
		boostrap: true,
		jQuery: true,
		iconFont: true
	}

	this.getUserInput();
}

Init.prototype.getUserInput = function() {
	prompt.start();
	prompt.message = "";
	prompt.delimiter = "";

	// @TODO refactor this 
	prompt.get(prompt_name, function (err, result) {
		this.props.name = result.name;

		prompt.get(prompt_makeFolder, function (err, result) {
			this.props.makeFolder = Utils.yesnoBoolean(result.yesno);

			prompt.get(prompt_title, function (err, result) {
				this.props.title = result.title;
			
				prompt.get(prompt_domain, function (err, result) {
					this.props.domain = result.domain;
			
					prompt.get(prompt_assetsPath, function (err, result) {
						this.props.assetsPath = result.path;
			
						prompt.get(prompt_boostrap, function (err, result) {
							this.props.boostrap = Utils.yesnoBoolean(result.yesno);
							
							prompt.get(prompt_jquery, function (err, result) {
								this.props.jQuery = Utils.yesnoBoolean(result.yesno);
			
								prompt.get(prompt_iconFont, function (err, result) {
									this.props.iconFont = Utils.yesnoBoolean(result.yesno);
									this.makeConfig();
									
								}.bind(this));
							}.bind(this));
						}.bind(this));
					}.bind(this));
				}.bind(this));
			}.bind(this));
		}.bind(this));
	}.bind(this));

}


Init.prototype.makeConfig = function() {
	console.log(this.props)
}


module.exports = Init; 


/** Prompts definitions **/
var prompt_name = {
	name: 'name',
	validator: /^[a-zA-Z0-9\.\-\_]+$/,
	required: true,
	message: 'Enter project name: '.cyan,
	warning: 'Name must be only letters, underscores, dots, or dashes'.red
};

var prompt_makeFolder = {
	name: 'yesno',
	validator: /y[es]*|n[o]?/,
	required: true,
	message: 'Create project folder? (y/n) '.cyan,
	warning: 'Must respond yes or no'.red
};

var prompt_title = {
	name: 'title',
	required: true,
	message: 'Website title:'.cyan
};

var prompt_domain = {
	name: 'domain',
	validator: /^[a-z0-9\.\-\_\:\/]+$/,
	required: true,
	message: 'Enter project domain: '.cyan,
	warning: 'Name must be only letters, underscores, dots, backslash or dashes'.red
};

var prompt_assetsPath = {
	name: 'path',
	validator: /^[a-zA-Z0-9\.\-\_\/]+$/,
	required: true,
	message: 'Path to generated assets:'.cyan,
	warning: 'Name must be only letters, underscores, dots, backslash or dashes'.red,
	default: "assets/"
};

var prompt_boostrap = {
	name: 'yesno',
	validator: /y[es]*|n[o]?/,
	required: true,
	message: 'Add Bootstrap css Framework? (y/n) '.cyan,
	warning: 'Must respond yes or no'.red,
	default: 'yes'
};

var prompt_jquery = {
	name: 'yesno',
	validator: /y[es]*|n[o]?/,
	required: true,
	message: 'Add jQuery? (y/n) '.cyan,
	warning: 'Must respond yes or no'.red,
	default: 'yes'
};

var prompt_iconFont = {
	name: 'yesno',
	validator: /y[es]*|n[o]?/,
	required: true,
	message: 'Add font-awesome? (y/n) '.cyan,
	warning: 'Must respond yes or no'.red,
	default: 'yes'
};