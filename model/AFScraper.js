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
var colors = require('colors');
var Forum = require('./Forum.js');
var Thread = require('./Thread.js');

// Main Class
//------------
function AFScraper(){

	// Object Configuration
	this.max_pile = 3;

	// Looping through a forum to get back the threadsnpo
	this.fetchForum = function(forum_url, output_directory){

		// Message
		console.log('Starting to fetch forum :: '.blue+forum_url);

		new Forum(forum_url, output_directory);
	}

	// Looping through threads to get back
	this.fetchThreads = function(json_list, output_directory){

		// Message
		console.log('Starting to fetch threads ::'.blue);

		// Looping through the list
		json_list.forEach(function(thread){
			new Thread(thread.url, output_directory);
		});
		// new Thread(json_list[0], output_directory);
	}
}

// Launching the process
//----------------------
module.exports = new AFScraper();