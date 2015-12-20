/**
 * Generating config file
**/
var fs = require('fs');

var ConfigFile = function () {
	this.config = {
	    "name": "Project Name",
	    "webspc": "0.1.0",
	    "assetsPath": "assets/",
	    "structure": {
	        "menu": [],
	        "sections": []
    	},
    	"plugins": [], //"boostrap", "jQuery", "fontAwesome"
    	"vars": {}
	}

	this.isExist = this.checkFile();

}

ConfigFile.prototype.checkFile = function() {
	try {
		file = fs.readFileSync(".webspcrc", 'utf8');
		this.config = JSON.parse(file);
		return true;
	} catch(e) {
		return false;
	}
}

ConfigFile.prototype.exist = function() {
	return this.isExist;
}

ConfigFile.prototype.setName = function(name) {
	this.config.name = name;
}

ConfigFile.prototype.setAssetsPath = function(path) {
	this.config.assetsPath = path;
}

ConfigFile.prototype.addMenuItem = function(name, target) {
	this.config.structure.menu.push(name + ";#" + target);
}

ConfigFile.prototype.addSectionsItem = function(id) {
	this.config.structure.sections.push(id);
}

ConfigFile.prototype.addPlugin = function(name) {
	this.config.plugins.push(name);
}

ConfigFile.prototype.addVar = function(key, val) {
	this.config.vars[key] = val;
}

ConfigFile.prototype.get = function() {
	return this.config;
}

ConfigFile.prototype.generate = function(prefix) {
	prefix = prefix != ""? prefix + "/" : "";
	var newFile = fs.openSync(prefix + ".webspcrc", 'w')
	fs.writeSync(newFile, JSON.stringify(this.config, null, 4))

}

module.exports = ConfigFile; 