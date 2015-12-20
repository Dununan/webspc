/**
 * Generating config file
**/
var fs = require('fs');

var Install = function (config, prefix) {
	this.config = config;
	this.folder_prefix = prefix? prefix + "/" : "";

	console.log("====> Creating folders".green);
	this.makeFolders();
	progress(20);

	console.log("====> Creating basic files".green);
	this.makeBasicFiles();
	progress(40);

	console.log("====> Setting compilation engine".green);
	// this.makeCompilationEnv();
	progress(60);

	console.log("====> Compilation".green);
	// Compilator.run();
	progress(80);

	progress(100);
	console.log("Project was successfuly created!".green)
}


Install.prototype.makeFolders = function() {
	var folder_prefix = this.folder_prefix;

	fs.mkdirSync(folder_prefix + "dist");
	fs.mkdirSync(folder_prefix + "src");

	// src sub folders
	fs.mkdirSync(folder_prefix + "src/html");
	fs.mkdirSync(folder_prefix + "src/css");
	fs.mkdirSync(folder_prefix + "src/js");

	// dist sub folders
	var path = this.config.assetsPath.split("/"); 
	var helpPath = "";
	path.forEach(function(val) {
		if(val != "") {
			fs.mkdirSync(folder_prefix + "dist/" + helpPath + val);
			helpPath += val + "/";

		}
	});

}


Install.prototype.makeBasicFiles = function() {
	var folder_prefix = this.folder_prefix;

	// html files
	fs.writeFileSync(folder_prefix + "src/html/index.html", getSrcFile("html/index.html"), "utf-8");
	fs.writeFileSync(folder_prefix + "src/html/navbar.html", getSrcFile("html/navbar.html"), "utf-8");
	fs.writeFileSync(folder_prefix + "src/html/header.html", getSrcFile("html/header.html"), "utf-8");
	fs.writeFileSync(folder_prefix + "src/html/footer.html", getSrcFile("html/footer.html"), "utf-8");

	// css files 
	fs.writeFileSync(folder_prefix + "src/css/_export.less", getSrcFile("css/export.less"), "utf-8");
	fs.writeFileSync(folder_prefix + "src/css/variables.less", getSrcFile("css/variables.less"), "utf-8");
	fs.writeFileSync(folder_prefix + "src/css/layout.less", getSrcFile("css/layout.less"), "utf-8");
	fs.writeFileSync(folder_prefix + "src/css/navbar.less", getSrcFile("css/navbar.less"), "utf-8");
	fs.writeFileSync(folder_prefix + "src/css/header.less", getSrcFile("css/header.less"), "utf-8");
	fs.writeFileSync(folder_prefix + "src/css/section.less", getSrcFile("css/section.less"), "utf-8");

	//js files
	fs.writeFileSync(folder_prefix + "src/js/_export.js", getSrcFile("js/export.js"), "utf-8");
	fs.writeFileSync(folder_prefix + "src/js/scripts.js", getSrcFile("js/scripts.js"), "utf-8");
}


module.exports = Install; 



function progress(percent) {
	console.log(("Progress: " + percent + "%").cyan);
}


function getSrcFile(path) {
	return fs.readFileSync(__dirname + "/../src/" + path).toString();
}