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
var Forum = require('./Forum.js');
var Thread = require('./Thread.js');
var ProcessTimer = require('../tools/ProcessTimer.js');

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

		new Forum(forum_url, output_directory, false, function(){
			 console.log(ProcessTimer.elapsed_time());
		});
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

				// Calling the end if this is the case
				if(self.num_processes == json_list.length + self.max_pile - 1){
					console.log("Process Finished".green);
					console.log(ProcessTimer.elapsed_time());
				}
			}

			update_processes();
		}
	}
}

// Launching the process
//----------------------
module.exports = new AFScraper();