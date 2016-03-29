/**
 * Compile project
**/
var prompt      = require('prompt');
var ConfigFile  = require('./../ConfigFile');
var Compilator     = require('./../Compilator');


var CompilatorCmd = function () {

	// var configFile = new ConfigFile();

	// if(configFile.exist()) {
	// 	new Install(configFile.get());
	// } else {
	// 	console.log('File .webspcrc doesnt exist! Please rund command webspc init to create it.'.red)
	// }

	Compilator.run();

}


module.exports = CompilatorCmd;