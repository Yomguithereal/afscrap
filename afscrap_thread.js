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
//---------
// -l / --list : url list path
// -o / --output : output directory
// -k / --keywords : keywords path
// -p / --processes : number of processes
// -f / --format : kind of output formatting


// Dependancies
//-------------
var fs = require('fs');
var colors = require('colors');
var program = require('commander');
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var path = require('path');
var AFScraper = require('./model/AFScraper.js');
var Config = require('./tools/ConfigLoader.js');

// Main Class
//------------
function ArgvParser(){

	// Default values
	this.output_directory = './output';
	this.keywords_path = './config/keywords.json';
	this.formats = ['json', 'mongo'];
	this.output_format = 'mongo';

	// Initializing the tool
	program
		.version('AFScrap Thread Fetcher 1.0'.blue)
		.option('-l, --list <path-to-list>', 'REQUIRED - path to the list of url of a forum (generated by afscrap_forum.js)')
		.option('-o, --output <output-directory>', 'output directory written in node flavor (default : ./output)')
		.option('-k, --keywords <keywords-path>', 'keywords json file path (default : ./config.keywords.json)')
		.option('-p, --processes <processes-number>', 'number of processes (default : 6, max : 20)', parseInt)
		.option('-f, --format <type>', "Output format [mongo] or [json] (default: mongo)")
		.parse(process.argv);

	// Required Options
	if(program.list === undefined){
		console.log('Error :: The url list is not indicated'.red);
		return false;
	}

	// Output directory override
	if(program.output){
		this.output_directory = program.output;
	}

	// Keyword File override
	if(program.keywords){
		this.keywords_path = program.keywords;
	}

	// Max Pile Override
	if(program.processes && program.processes <= 20){
		AFScraper.max_pile = program.processes;
	}

	// Output format
	if(program.format !== undefined){
		if(this.formats.indexOf(program.format) == -1){
			console.log('Error :: Format of output is not correct. [mongo] or [json].'.red);
			return false;
		}

		this.output_format = program.format;
	}

	// If we want to ouput to mongo
	if(this.output_format == 'mongo'){

		// Database path
		var database_name = path.basename(program.list, '.json');
		mongoose.connect('mongodb://localhost/'+database_name);

		// Mongoose database schema
		var threadSchema = Schema({
			data : Schema.Types.Mixed
		});
		var threadModel = mongoose.model('threads', threadSchema);
		
		// Passing to model
		this.output_directory = threadModel;

	}

	// Test sur un forum en particulier
	Config.load({variable : 'list', file : program.list});
	Config.load({variable : 'keywords', file : this.keywords_path});

	// Checking existence of output dir.
	if(!fs.existsSync(this.output_directory) && this.output_format != 'mongo'){
			
		// The output directory does not exist, we create it
		fs.mkdirSync(this.output_directory);
	}

	// Launching process
	AFScraper.fetchThreads(Config.list.threads, Config.keywords, this.output_format, this.output_directory, program.list, mongoose);
	
}


// Launching Process
//------------
ArgvParser();