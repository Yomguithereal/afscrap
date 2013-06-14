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
//=============
var colors = require('colors');
var async = require('async');
var config = require('../tools/ConfigLoader');

// Main Class
//===========
function AFScraper(){

	// Object Configuration
	var self = this;
	var pool = config.processes || 1;

	// Forum Loop
	//--------------
	this.fetchForum = function(forum_url){

		// Model
		var Forum = require('./Forum');

		// Message
		console.log('Starting to fetch forum :: '.blue+forum_url);

		new Forum(forum_url, function(filename){
			
			// Announcing end
			console.log('Process Finished'.green);
			console.log('Get the results in : '.blue+filename);
		});
	}

	// Thread Loop
	//--------------
	this.fetchThreads = function(mongoose){

		// Model
		var Thread = require('./Thread');

		// Caching
		var cache = require('../tools/Cacher');
		cache.check(config.list_path);

		// Queuing
		var queue = async.queue(Thread, this.pool);
		config.list.threads.forEach(function(item, i){
			if(cache.stash.indexOf(i) == -1){
				queue.push({url: item.url, index: i}, function(index){
					cache.write(index);
				});
			}
		});

		// Closing function
		queue.drain = function(){

			// Closing connection to database
			if(config.format == 'mongo'){
				mongoose.disconnect();
			}

			// Destroying cache
			cache.delete();

			// Announcing
			console.log("Process Finished".green);
			if(config.format == 'mongo'){
				console.log('Get the results in mongo database'.blue);
			}
			else{
				console.log('Get the results in : '.blue+config.output);
			}
		}
	}

	// Text Compilation
	//-----------------


}

// Exporting
//==========
module.exports = new AFScraper();