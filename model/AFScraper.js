/*
| -------------------------------------------------------------------
|  Afscrap Main File
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Organization : Medialab - Sciences-Po
|	Version : 1.0
*/

// Dependancies
//-------------
var Thread = require('./Thread.js');

// Main Class
//------------
function AFScraper(){

	// Methods
	this.fetchThreads = function(json_list, output_directory){

		// Looping through the list
		json_list.forEach(function(thread){
			new Thread(thread, output_directory);
		});
		// new Thread(json_list[0], output_directory);
	}
}

// Launching the process
//----------------------
module.exports = new AFScraper();