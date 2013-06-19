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
//=========
// -o / --output : output directory
// -d / --database : database to compile


// Dependancies
//=============
var fs = require('fs');
var program = require('./tools/ArgvParser');
var colors = require('colors');
var mongoose = require('mongoose');
var config = require('./tools/ConfigLoader');
var Schema = require('mongoose').Schema;
var AFScraper = require('./model/AFScraper');


// Main Class
//===========
function AFScraperCompile(){


	// Announcing
	console.log('');
	console.log('AFScrap Threads Compiler'.yellow);
	console.log('------------------------'.yellow);

	// Initializing the tool
	program
		.version('AFScrap Text Compiler 1.0'.blue)
		.option('-o, --output <output-directory>', 'output directory written in node flavor (default : name of database)')
		.option('-d, --database <database-name>', 'mongo database to compile to text')
		.parse(process.argv)

		// Required arguments
		.check('database')

		// Default values
		.assign('output', './'+program.database)
		.toConfig('database', 'output');



	// Checking existence of output dir.
	if(!fs.existsSync(program.output)){
			
		// The output directory does not exist, we create it
		fs.mkdirSync(program.output);
	}

	// Connecting database
	mongoose.connect('mongodb://localhost/'+program.database);
	var threadSchema = Schema({
		data : Schema.Types.Mixed
	});
	var threadModel = mongoose.model('threads', threadSchema);

	// Passing to config
	config.model = threadModel;

	
	// Launching process
	AFScraper.compile(function(){
		mongoose.connection.close();
	});
}


// Launching Process
//==================
AFScraperCompile();
