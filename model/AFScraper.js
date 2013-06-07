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

	// Object Configuration
	this.max_pile = 3;

	// Looping through a forum to get back the url
	this.fetchForum = function(forum_url, output_directory){
		console.log('tadn');
	}

	// Looping through threads to get back
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