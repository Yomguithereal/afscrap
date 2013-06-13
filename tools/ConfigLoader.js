/*
| -------------------------------------------------------------------
|  Configuration Loader
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Version : 1.0
*/

// Dependancies
//=============
var fs = require('fs');
var colors = require('colors');

// Main Class
//===========
function ConfigLoader(){

	var self = this;

	// Loading a configuration file
	this.load = function(variable, file){

		// Checking existence of configuration file
		if(!fs.existsSync(file)){
			console.log(('Error :: The file you are trying to load ('+file+') does not exist.').red);
			process.exit();
		}

		// Parsing JSON
		var json = fs.readFileSync(file);

		// Allocating property
		self[variable] = JSON.parse(json);

	}
}


// Exporting
//==========
module.exports = new ConfigLoader();
