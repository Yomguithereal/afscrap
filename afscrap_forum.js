#!/usr/bin/env node
/*
| -------------------------------------------------------------------
|  Afscrap Forum Fetcher
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Organization : Medialab - Sciences-Po
|	Version : 1.0
*/

/*
Commands :
--------
-u / --url : url of forum to crawl
-o / --output : path to output directory
*/

// Deoendancies
//-------------
var fs = require('fs');
var colors = require('colors');
var AFScraper = require('./model/AFScraper.js');
var Config = require('./tools/ConfigLoader.js');

// Main Class
//------------
function ArgvParser(){

	// Default values
	this.output_directory = './output';

	// Initializing the tool


	// Manual


	// Checking existence of output dir.
	if(!fs.existsSync(this.output_directory)){
			
		// The output directory does not exist, we create it
		fs.mkdirSync(this.output_directory);
	}

	// AFScraper.fetchForum('http://www.aufeminin.com/forum/show1_matern1_1/grossesse/grossesse-attendre-bebe.html', this.output_directory);
	
}


// Launching Process
//------------
ArgvParser();