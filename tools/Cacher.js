/*
| -------------------------------------------------------------------
|  Cache Helper
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Version : 1.0
*/

// Dependencies
//=============
var path = require('path');
var fs = require('fs');
var colors = require('colors');


// Main Class
//===========
function Cacher(){

	var self = this;

	// Properties
	this.stash = [];
	this.cache_directory = false;
	this.cache_file = false;

	// Function to create cache directory
	this.check = function(json_path){

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
		this.stash = cache.substring(1).split(';').map(function(item){return parseInt(item);});

	}

	// Function to write cache
	this.write = function(index){
		fs.appendFile(this.cache_directory+'/'+this.cache_file, ';'+index);
	}

	// Function to delete cache
	this.delete = function(){
		fs.unlink(this.cache_directory+'/'+this.cache_file);
	}
}


// Exporting
//==========
module.exports = new Cacher();
