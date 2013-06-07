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

		// Parsing JSON
		var json = fs.readFileSync(object.file);

		// Allocating property
		self[object.variable] = JSON.parse(json);

	}
}


// Exporting
//------------
module.exports = new ConfigLoader();
