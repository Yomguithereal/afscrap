/*
| -------------------------------------------------------------------
|  Configuration Loader
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Organization : Medialab - Sciences-Po
|	Version : 1.0
*/

// Dependancies
//-------------
var fs = require('fs');

// Main Class
//------------
function ConfigLoader(){

	var self = this;

	// Loading a configuration file
	this.load = function(object){

		// Checking existence of configuration file
		if(!fs.existsSync(object.file)){
			console.log(('Error :: The file you are trying to load ('+object.file+') does not exist.').red);
			process.exit();
		}

		// Parsing JSON
		var json = fs.readFileSync(object.file);

		// Allocating property
		self[object.variable] = JSON.parse(json);

	}
}


// Exporting
//------------
module.exports = new ConfigLoader();
