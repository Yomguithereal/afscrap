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
var CLTool = require('node-commandline');
var AFScrapper = require('./model/AFScrapper.js');

// Main Class
//------------
function ArgvParser(){
	
	// Initializing the tool
	var Commands = new CLTool.CommandLine('main');
	console.log(Commands);

}


// Launching Process
//------------
module.exports = new ArgvParser();
