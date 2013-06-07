#!/usr/bin/env node
/*
| -------------------------------------------------------------------
|  Afscrap Launcher
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Organization : Medialab - Sciences-Po
|	Version : 1.0
*/

// Deoendancies
//-------------
var fs = require('fs');
var CLTool = require('node-commandline');
var AFScraper = require('./model/AFScraper.js');
var Config = require('./tools/ConfigLoader.js');

// Main Class
//------------
function ArgvParser(){
	
	// Initializing the tool
	var Commands = new CLTool.CommandLine('main');

	// TODO : Gérer les arguments de la commandline
	// Lauching process

	// Test sur un forum en particulier
	Config.load({variable : 'list', file : './config/forum_test.json'});
	Config.output_directory = './output';

	// Checking existence of output dir.
	if(!fs.existsSync(Config.output_directory)){
			
		// The output directory does not exist, we create it
		fs.mkdirSync(Config.output_directory);
	}

	AFScraper.fetchThreads(Config.list, 'test', Config.output_directory);
	// AFScraper.fetchForum('http://www.aufeminin.com/forum/show1_matern1_1/grossesse/grossesse-attendre-bebe.html', Config.output_directory);
	
}


// Launching Process
//------------
ArgvParser();