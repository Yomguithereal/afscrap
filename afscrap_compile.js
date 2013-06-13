#!/usr/bin/env node
/*
| -------------------------------------------------------------------
|  Afscrap Text Compilation
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Organization : Medialab - Sciences-Po
|	Version : 1.0
*/


// Commands
//---------
// -o / --output : output directory
// -d / --database : database to compile
// -p / --processes : number of processes


// Dependancies
//-------------
var fs = require('fs');
var program = require('commander');
var colors = require('colors');
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var AFScraper = require('./model/AFScraper.js');


// Main Class
//------------
function ArgvParser(){

	// Default values
	this.output_directory = './output-text';

	// Initializing the tool
	program
		.version('AFScrap Text Compiler 1.0'.blue)
		.option('-o, --output <output-directory>', 'output directory written in node flavor (default : ./output-text)')
		.option('-d, --database <database-name>', 'mongo database to compile to text')
		.option('-p, --processes <processes-number>', 'number of processes (default : 1, max : 20)', parseInt)
		.parse(process.argv);


	// Database name
	if(program.database === undefined){
		console.log('Error :: The database name is not indicated'.red);
		return false;
	}

	// Output directory override
	if(program.output){
		this.output_directory = program.output;
	}

	// Max Pile Override
	if(program.processes && program.processes <= 20){
		AFScraper.max_pile = program.processes;
	}

	// Checking existence of output dir.
	if(!fs.existsSync(this.output_directory) && this.output_format != 'mongo'){
			
		// The output directory does not exist, we create it
		fs.mkdirSync(this.output_directory);
	}

	// Connecting database
	mongoose.connect('mongodb://localhost/'+program.database);
	var threadSchema = Schema({
		data : Schema.Types.Mixed
	});
	var threadModel = mongoose.model('threads', threadSchema);
	

	// Launching process
	AFScraper.compile(threadModel, this.output_directory, function(){
		mongoose.connection.close();
	});
}


// Launching Process
//------------
ArgvParser();


// name jj-mm-yy__auteur__titre__forum
// then blocks;