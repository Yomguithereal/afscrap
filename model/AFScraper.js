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
var path = require('path');
var Forum = require('./Forum.js');
var Thread = require('./Thread.js');
var ProcessTimer = require('../tools/ProcessTimer.js');

// Main Class
//------------
function AFScraper(){

	// Object Configuration
	var self = this;
	this.max_pile = 6;
	this.num_processes = -1;
	this.cache = [];
	this.cache_directory = false;
	this.cache_file = false;


	// Main Methods
	//-------------

	// Looping through a forum to get back the threads list
	this.fetchForum = function(forum_url, output_directory){

		// Message
		console.log('Starting to fetch forum :: '.blue+forum_url);

		new Forum(forum_url, output_directory, false, function(){
			 console.log(ProcessTimer.elapsed_time());
		});
	}

	// Looping through threads to get back
	this.fetchThreads = function(json_list, keywords, output_directory, json_path){

		// Message
		console.log('Starting to fetch threads'.blue);

		// Checking cache
		this.check_cache(json_path);


		// Recursive worker
		function update_processes(index){
			
			// Updating counter and confront it to cache
			self.num_processes += 1;
			while(self.cache.indexOf(self.num_processes) > -1){
				self.num_processes += 1;
			}

			// Testing existence of index
			if(json_list[self.num_processes] !== undefined){
				// console.log('debug:: '.blue+'Reallocating process');
				new Thread(json_list[self.num_processes].url, keywords, output_directory, self.num_processes, update_processes);
			}

			// Writing cache
			if(index !== undefined){ self.write_cache(index); }

			// Calling the end if this is the case
			if(index == json_list.length - 1){

				// Deleting Cache
				self.delete_cache();

				// Announcing
				console.log("Process Finished".green);
				console.log('Get the results in : '.blue+output_directory);
				console.log(ProcessTimer.elapsed_time());
			}
		}

		// Looping through the list while respecting pile
		if(json_list.length < this.max_pile){ this.max_pile = json_list.length}
		for(var i=1; i <= this.max_pile; i++){

			update_processes();
		}
	}



	// Cache Handler
	//--------------

	// Function to create cache directory
	this.check_cache = function(json_path){

		// Setting properties
		this.cache_directory = path.dirname(json_path);
		this.cache_file = path.basename(json_path, '.json')+'.cache';

		// Checking existence of cache dir.
		if(!fs.existsSync(this.cache_directory)){
				
			// The cache directory does not exist, we create it
			console.log('Creating cache directory'.blue);
			fs.mkdirSync(this.cache_directory);
		}

		// Checking existence of cache file
		if(!fs.existsSync(this.cache_directory+'/'+this.cache_file)){

			// The cache file does not exist, we create it
			console.log('Creating cache file'.blue);
			fs.writeFileSync(this.cache_directory+'/'+this.cache_file, '');

			return false;
		}

		// A cache file exist, we parse it to resume the process
		console.log('Resuming process from cache.'.green);
		var cache = fs.readFileSync(this.cache_directory+'/'+this.cache_file, 'UTF-8');
		this.cache = cache.substring(1).split(';').map(function(item){return parseInt(item);});

	}

	// Function to write cache
	this.write_cache = function(index){
		fs.appendFile(this.cache_directory+'/'+this.cache_file, ';'+index);
	}

	// Function to delete cache
	this.delete_cache = function(){
		fs.unlink(this.cache_directory+'/'+this.cache_file);
	}
}

// Launching the process
//----------------------
module.exports = new AFScraper();