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
//-========
// -u / --url : url of forum to crawl
// -o / --output : path to output directory


// Dependancies
//=============
var fs = require('fs');
var program = require('./tools/ArgvParser');
var config = require('./tools/ConfigLoader');
var AFScraper = require('./model/AFScraper');

// Main Class
//------------
function AFScrapForum(){

	// Announcing
	console.log('');
	console.log('AFScrap Forum Parser'.yellow);
	console.log('--------------------'.yellow);

	// Initializing the tool
	program
		.version('AFScrap Forum List Fetcher 1.0'.blue)
		.usage('')
		.option('-o, --output <output-directory>', 'output directory written in node flavor (default : ./output)')
		.option('-u, --url <forum-to-crawl>', 'url of forum to crawl')
		.parse(process.argv)

		// Default values
		.assign('output', './forum_lists')

		// Required Arguments
		.check('url')

		// Transfer to Config
		.toConfig('output');
	


	// Checking existence of output dir.
	if(!fs.existsSync(program.output)){
			
		// The output directory does not exist, we create it
		fs.mkdirSync(program.output);
	}

	// Launching process
	AFScraper.fetchForum(program.url);
	
}


// Launching Process
//==================
AFScrapForum();