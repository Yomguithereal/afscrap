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
var AFScraper = require('./model/AFScraper.js');

// Main Class
//------------
function ArgvParser(){
	
	// Initializing the tool
	var Commands = new CLTool.CommandLine('main');

	// TODO : Gérer les arguments de la commandline
	// Lauching process

	// Test sur un forum en particulier
	

}


// Launching Process
//------------
module.exports = new ArgvParser();
