/**
 * Install project
**/
var prompt      = require('prompt');
var ConfigFile  = require('./../ConfigFile');
var Install     = require('./../Install');


var InstallCmd = function () {

	var configFile = new ConfigFile();

	if(configFile.exist()) {
		new Install(configFile.get());
	} else {
		console.log('File .webspcrc doesnt exist! Please rund command webspc init to create it.'.red)
	}

}


module.exports = InstallCmd;