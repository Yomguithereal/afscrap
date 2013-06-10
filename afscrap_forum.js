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
var program = require('commander');
var colors = require('colors');
var AFScraper = require('./model/AFScraper.js');
var Config = require('./tools/ConfigLoader.js');

// Main Class
//------------
function ArgvParser(){

	// Default values
	this.output_directory = './output';
	this.forum_url = false;

	// Initializing the tool
	program
		.version('0.0.1')
		.usage('')
		.option('-o, --output <n>', 'output directory written in node flavor (default : ./output)')
		.option('-u, --url <n>', 'url of forum to crawl')
		.parse(process.argv);

	// Checking forum url

	// Setting output directory
	if(program.output !== undefined){
		this.output_directory = program.output_directory;
	}

	// Checking existence of output dir.
	if(!fs.existsSync(this.output_directory)){
			
		// The output directory does not exist, we create it
		fs.mkdirSync(this.output_directory);
	}



	// TEST : http://www.aufeminin.com/forum/show1_matern1_1/grossesse/grossesse-attendre-bebe.html
	// AFScraper.fetchForum('http://www.aufeminin.com/forum/show1_matern1_1/grossesse/grossesse-attendre-bebe.html', this.output_directory);
	
}


// Launching Process
//------------
ArgvParser();