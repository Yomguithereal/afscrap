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
var fs = require('fs');
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
	this.cache_directory = './cache';

	// Looping through a forum to get back the threads list
	this.fetchForum = function(forum_url, output_directory){

		// Message
		console.log('Starting to fetch forum :: '.blue+forum_url);

		new Forum(forum_url, output_directory, false, function(){
			 console.log(ProcessTimer.elapsed_time());
		});
	}

	// Looping through threads to get back
	this.fetchThreads = function(json_list, keywords, output_directory){

		// Checking cache
		this.check_cache();

		// Message
		console.log('Starting to fetch threads'.blue);

		// Recursive worker
		function update_processes(index){
			self.num_processes += 1;

			// Testing existence of index
			if(json_list[self.num_processes] !== undefined){
				// console.log('debug:: '.blue+'Reallocating process');
				new Thread(json_list[self.num_processes].url, keywords, output_directory, self.num_processes, update_processes);
			}

			// Calling the end if this is the case
			if(index == json_list.length - 1){
				console.log("Process Finished".green);
				console.log(ProcessTimer.elapsed_time());
			}
		}

		// Looping throught the list while respecting pile
		for(var i=1; i <= this.max_pile; i++){

			update_processes();
		}
	}

	// Function to create cache directory
	this.check_cache = function(){

		// Checking existence of cache dir.
		if(!fs.existsSync(this.cache_directory)){
				
			// The cache directory does not exist, we create it
			console.log('Creating cache directory'.blue);
			fs.mkdirSync(this.cache_directory);
			return false;
		}
	}
}

// Launching the process
//----------------------
module.exports = new AFScraper();