#!/usr/bin/env node
/*
| -------------------------------------------------------------------
|  Afscrap Thread Fetcher
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Organization : Medialab - Sciences-Po
|	Version : 1.0
*/

// Commands
//=========
// -l / --list : url list path
// -o / --output : output directory
// -k / --keywords : keywords path
// -p / --processes : number of processes
// -f / --format : kind of output formatting


// Dependencies
//=============
var fs = require('fs');
var program = require('./tools/ArgvParser');
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var path = require('path');
var AFScraper = require('./model/AFScraper.js');
var config = require('./tools/ConfigLoader.js');
var fetcher = require('./tools/Fetcher');

// Main Class
//===========
function AFScrapThread(){

	// Announcing
	console.log('');
	console.log('AFScrap Thread Parser'.yellow);
	console.log('---------------------'.yellow);

	// Special checks
	function check_format(val){
		return ['json', 'mongo'].indexOf(val) > -1;
	}
	function check_processes(val){
		return val < 20;
	}

	// Initializing the tool
	program
		.version('AFScrap Thread Fetcher 1.0'.blue)
		.option('-l, --list <path-to-list>', 'REQUIRED - path to the list of url of a forum (generated by afscrap_forum.js)')
		.option('-o, --output <output-directory>', 'output directory written in node flavor (default : ./output)')
		.option('-k, --keywords <keywords-path>', 'keywords json file path (default : ./config.keywords.json)')
		.option('-p, --processes <processes-number>', 'number of processes (default : 1, max : 20)', parseInt)
		.option('-f, --format <type>', "Output format [mongo] or [json] (default: mongo)")
		.parse(process.argv)

		// Verifications
		.check('list')
		.checkAgainst('format', check_format, 'the format must be [json] or [mongo]')
		.checkAgainst('processes', check_processes, 'the number of processes cannot be superior to 20')

		// Default Values
		.assign('output', './output')
		.assign('keywords', './config/keywords.json')
		.assign('format', 'mongo')
		.assign('processes', 1)

		// Passing to config
		.toConfig('output', 'format', 'processes');


	// If we want to ouput to mongo
	if(program.format == 'mongo'){

		// Database path
		var database_name = path.basename(program.list, '.json');
		mongoose.connect('mongodb://localhost/'+database_name);

		// Mongoose database schema
		var threadSchema = Schema({
			data : Schema.Types.Mixed
		});
		var threadModel = mongoose.model('threads', threadSchema);
		
		// Passing to configuration
		config.model = threadModel;

	}

	// Configuration loading
	config.load('list', program.list);
	config.list_path = program.list;
	config.load('keywords', program.keywords);
	config.load('extern', './config/config.json');

	// Setting proxy
	fetcher.proxy = config.extern.proxy || false;

	// Checking existence of output dir.
	if(!fs.existsSync(program.output) && program.format != 'mongo'){
			
		// The output directory does not exist, we create it
		fs.mkdirSync(program.output);
	}

	// Launching process
	AFScraper.fetchThreads(mongoose || false);
	
}


// Launching Process
//==================
AFScrapThread();