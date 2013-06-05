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
	this.fetchThreads = function(json_list){

		// Looping through the list
		// json_list.forEach(function(thread){
		// 	new Thread(thread);
		// });
		new Thread(json_list[2]);
	}
}

// Launching the process
//----------------------
module.exports = new AFScraper();