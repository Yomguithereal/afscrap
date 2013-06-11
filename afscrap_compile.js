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


// Dependancies
//-------------
var fs = require('fs');
var program = require('commander');
var colors = require('colors');


// Main Class
//------------
function ArgvParser(){

	// Default values
	this.output_directory = './output-text';

	// Initializing the tool
	program
		.version('1.0')
		.option('-o, --output <output-directory>', 'output directory written in node flavor (default : ./output-text)')
		.parse(process.argv);

	// Output directory override
	if(program.output){
		this.output_directory = program.output;
	}

	// Checking existence of output dir.
	if(!fs.existsSync(this.output_directory) && this.output_format != 'mongo'){
			
		// The output directory does not exist, we create it
		fs.mkdirSync(this.output_directory);
	}
}


// Launching Process
//------------
ArgvParser();