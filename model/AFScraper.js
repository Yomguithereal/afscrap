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

// Dependencies
//=============
var colors = require('colors');
var async = require('async');
var fs = require('fs');
var Schema = require('mongoose').Schema;
var config = require('../tools/ConfigLoader');

// Main Class
//===========
function AFScraper(){

	// Object Configuration
	var self = this;
	this.pool = 1;

	// Cleansing Regex
	this.cleansing_regex = new RegExp('<[^>]+>', 'gi');

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

		// Processes
		this.pool = config.processes || 1;

		// Model
		var Thread = require('./Thread');

		// Caching
		var cache = require('../tools/Cacher');
		cache.check(config.list_path);

		// Override for async
		function create_thread(task, callback){
			new Thread(task, callback);
		}

		// Queuing
		var queue = async.queue(create_thread, this.pool);
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
	this.compile = function(callback){

		// Announcing
		console.log('Starting text compilation'.blue);

		// Checking emptyness
		config.model.count(function(err, count){
			if(count == 0){
				console.log('Error :: the database is inexistant or empty'.red);
				end();
				return false;
			}

			// Getting the threads back
			config.model.find({}, function(err, rows){

				var queue = async.queue(output, 50);
				rows.forEach(function(row){

					// Outputting
					queue.push(row.data);
				});

				// Finishing
				queue.drain = end;
			});
		});


		// Templating
		function output(thread, callback){

			// Filename
			var filename = thread.date+'__'+thread.author+'__'+escape(thread.title)+'__'+config.database+'.txt';

			// Splitting posts into blocks
			var string = '';
			thread.posts.forEach(function(post){
				string += post.text.replace(self.cleansing_regex, '')+'\n\n';
			});

			// Writing file
			fs.writeFile(config.output+'/'+filename, string, function(){
				callback();
			});
		}


		// Closing
		function end(){

			// Message
			console.log('Process Finished'.green);
			console.log('Find the results in : '.blue+config.output);

			// Back to ArgvParser to close connection
			callback();
		}
	}

}

// Exporting
//==========
module.exports = new AFScraper();