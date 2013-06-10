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

// Dependancies
//-------------
var fs = require('fs');
var colors = require('colors');
var AFScraper = require('./model/AFScraper.js');
var Config = require('./tools/ConfigLoader.js');

// Main Class
//------------
function ArgvParser(){

	// Initializing the tool

	// TODO : Gérer les arguments de la commandline
	// Lauching process

	// MAX PILE OVERRIDE

	// Test sur un forum en particulier
	var json_path = './config/forum_test.json';
	Config.load({variable : 'list', file : './config/forum_test.json'});
	Config.output_directory = './output';

	// Checking existence of output dir.
	if(!fs.existsSync(Config.output_directory)){
			
		// The output directory does not exist, we create it
		fs.mkdirSync(Config.output_directory);
	}

	AFScraper.fetchThreads(Config.list.threads, ['cesarienne', 'césarienne'], Config.output_directory, json_path);
	
}


// Launching Process
//------------
ArgvParser();