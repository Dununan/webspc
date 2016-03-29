var commander      = require('commander');

/** Commands modules **/
var Init           = require('./lib/commands/Init');
var InstallCmd     = require('./lib/commands/Install');
var CompilatorCmd  = require('./lib/commands/Compilator');
/** ================ **/


commander.version('0.1.0');


/** Command: init **/
commander
	.command('init')
	.description('Initialize new project')
	.action(function(){
		new Init();
	});
/** ============ **/


/** Command: install **/
commander
	.command('install')
	.description('Instal project from config file .webspcrc')
	.action(function(){
		new InstallCmd();
	});
/** ============ **/


/** Command: compile **/
commander
	.command('compile')
	.description('Compile project to folder dist')
	.action(function(){
		new CompilatorCmd();
	});
/** ============ **/


commander.parse(process.argv);

if (!process.argv.slice(2).length) {
	commander.help();
}