var commander = require('commander');

/** Commands modules **/
var Init = require('./lib/commands/Init');
/** ================ **/


commander.version('0.1.0');


/** Command: init **/
commander
	.command('init')
	.description('Initialize new project')
	.action(function(){
		var init = new Init();
	});
/** ============ **/


commander.parse(process.argv);

if (!process.argv.slice(2).length) {
	commander.help();
}