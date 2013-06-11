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


// Commands
//---------
// -u / --url : url of forum to crawl
// -o / --output : path to output directory


// Dependancies
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
	this.output_directory = './forum_lists';

	// Initializing the tool
	program
		.version('AFScrap Forum List Fetcher 1.0'.blue)
		.usage('')
		.option('-o, --output <output-directory>', 'output directory written in node flavor (default : ./output)')
		.option('-u, --url <forum-to-crawl>', 'url of forum to crawl')
		.parse(process.argv);

	// Checking forum url
	if(program.url === undefined){
		console.log('Error :: Forum url is not given. (Option --url).'.red);
		return false;
	}
	else{
		this.forum_url = program.url;
	}

	// Setting output directory
	if(program.output !== undefined){
		this.output_directory = program.output;
	}

	// Checking existence of output dir.
	if(!fs.existsSync(this.output_directory)){
			
		// The output directory does not exist, we create it
		fs.mkdirSync(this.output_directory);
	}

	// Launching process
	// TEST : http://www.aufeminin.com/forum/show1_matern1_1/grossesse/grossesse-attendre-bebe.html
	AFScraper.fetchForum(this.forum_url, this.output_directory);
	
}


// Launching Process
//------------
ArgvParser();