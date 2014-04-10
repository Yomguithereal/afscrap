#!/usr/bin/env node
/*
| -------------------------------------------------------------------
|  Afscrap Stats Builder
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Organization : Medialab - Sciences-Po
|	Version : 1.0
*/


// Commands
//=========


// Dependencies
//=============
var fs = require('fs');
var program = require('./tools/ArgvParser');
var colors = require('colors');
var mongoose = require('mongoose');
var config = require('./tools/ConfigLoader');
var AFStats = require('./model/AFStats');


// Main Class
//===========
function AFStatsBuilder(){


	// Announcing
	console.log('');
	console.log('AFScrap Stats Builder'.yellow);
	console.log('---------------------'.yellow);

	// Initializing the tool
	program
		.version('AFScrap Stats Builder 1.0'.blue)
		.parse(process.argv)

	// Loading configuration
	config.load('fora', './forum_lists/recapitulatif.json');

	// Output folder
	if(!fs.existsSync('stats')){
		fs.mkdirSync('stats');
	}

	AFStats.exec(function(){
		mongoose.disconnect();
	});
}


// Launching Process
//==================
AFStatsBuilder();
