var fs           = require('fs');
var path         = require('path');
var less         = require('less');
var uglifyJS     = require("uglify-js");
var cssmin       = require('cssmin');
var autoprefixer = require('autoprefixer');
var postcss      = require('postcss');
var wrench       = require('wrench')
var Promise      = require('promise');
var ConfigFile   = require('./ConfigFile');


var Compilator = {

	regex_includeFile:          /{{include\(['"](.*)["']\)}}/g,
	regex_includeFileJs:        /{{include\(["'](.*)['"]\)}}/g,
	regex_includeFileCachebust: /{{include\(@(.*)\)}}/g,
	regex_getVar:               /{{@(.*)}}/g,
	configFile: {},
	css: "",
	js: "",

	run: function() {
		console.log("Compilation Started...".green)
		console.log("=> Reading Config file...".cyan)
		this.configFile = new ConfigFile();

		var promise = new Promise(this.compileCss);

		promise.then(function(css) {
			Compilator.css = css;
			Compilator.js = Compilator.compileJs();
			Compilator.compileHtml();
			Compilator.moveStatic();
			Compilator.moveUploaded();
		})

	},

	compileHtml: function() {
		console.log("=> Start compile html files...".cyan)
		var output = this.getFile("", "src/html/index.html");
		output = output.replace("{{renderCss}}", '<style type="text/css">' + Compilator.css + '</style>');
		output = output.replace("{{renderScripts}}", '<script type="text/javascript">' + Compilator.js + '</script>');
		this.saveFile(output)
	},

	compileJs: function() {
		console.log("=> Start compile js files...".cyan)
		var file = fs.readFileSync("src/js/_export.js", "utf8");
		file = file.replace(Compilator.regex_includeFileJs, Compilator.setPath.bind("src/js/_export.js") );
		file = file.replace(Compilator.regex_includeFileJs, function(str, filename) {
			return fs.readFileSync(filename, "utf8")
		});
		var js = uglifyJS.minify(file, {fromString: true});
		return js.code;
	},

	compileCss: function(resolve, reject) {
		console.log("=> Start compile css files...".cyan)
		less.render(fs.readFileSync("src/css/_export.less", "utf8"),{
			paths: ['.', './src/css'],  // Specify search paths for @import directives
			filename: 'style.less', // Specify a filename, for better error messages
			compress: true          // Minify CSS output
		}, function (e, output) {
			var css = output.css;

			postcss([ autoprefixer ]).process(css).then(function (result) {
				result.warnings().forEach(function (warn) {
					console.warn(warn.toString());
				});
				var css = cssmin(result.css)
				resolve(css);
			});

			// TODO url cache bust?
		});

	},

	getFile: function(str, filename) {
		var file = {
			data: fs.readFileSync(filename, "utf8"),
			path: filename
		}
		
		console.log(">>>> Parsing file: " + filename);
		file.data = Compilator.parseFile(file);

		return file.data;
	},

	parseFile: function(file) {
		// process: {{include('file.html')}}
		file.data = file.data.replace(Compilator.regex_includeFile, Compilator.setPath.bind(file.path) );
		var parsedFile = file.data.replace(Compilator.regex_includeFile, Compilator.getFile );

		// process: {{@var_name}}
		parsedFile = parsedFile.replace(Compilator.regex_getVar, Compilator.echoVar );

		return parsedFile;
	},

	setPath: function(str, filename) {
		return str.replace(filename, path.dirname(this) + "/" + filename)
	},

	echoVar: function(str, varKey) {
		return str.replace(str, Compilator.configFile.getVar(varKey))
	},

	saveFile: function(output) {
		fs.writeFile("dist/index.html", output, function(err) {
			if(err) {
					return console.log(err);
			}

			console.log(">>>> Compilation done! <<<<".green);
		}); 
	},

	moveStatic: function() {
		var pathFrom = "src/img/";
		var pathTo = "dist/files/img/";//this.configFile.assetsPath;

		console.log(">>>> Copy folder img...");
		wrench.copyDirSyncRecursive(pathFrom, pathTo, {
    		forceDelete: true
		});
	},

	moveUploaded: function() {
		var pathFrom = "src/upload/";
		var pathTo = "dist/files/upload/";//this.configFile.assetsPath;

		console.log(">>>> Copy folder upload...");
		wrench.copyDirSyncRecursive(pathFrom, pathTo, {
    		forceDelete: true
		});
	}

}


module.exports = Compilator;