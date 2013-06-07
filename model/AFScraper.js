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
	var self = this;
	this.max_pile = 3;
	this.num_processes = -1;

	// Looping through a forum to get back the threadsnpo
	this.fetchForum = function(forum_url, output_directory){

		// Message
		console.log('Starting to fetch forum :: '.blue+forum_url);

		new Forum(forum_url, output_directory);
	}

	// Looping through threads to get back
	this.fetchThreads = function(json_list, keywords, output_directory){

		// Message
		console.log('Starting to fetch threads'.blue);

		// Looping throught the list while respecting pile
		for(var i=1; i <= this.max_pile; i++){

			// Recursive
			function update_processes(){
				self.num_processes += 1;

				// Testing existence of index
				if(json_list[self.num_processes] !== undefined){
					// console.log('debug:: '.blue+'Reallocating process');
					new Thread(json_list[self.num_processes].url, output_directory, keywords, update_processes);
				}

			}

			update_processes();
		}


		// Looping through the list
		// json_list.forEach(function(thread){
		// 	new Thread(thread.url, output_directory);
		// });

	}
}

// Launching the process
//----------------------
module.exports = new AFScraper();