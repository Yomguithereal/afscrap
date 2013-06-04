/*
| -------------------------------------------------------------------
|  Afscrap Main File
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Organization : Medialab - Sciences-Po
|	Version : 1.0
*/

// Dependancies
//-------------
var Config = require('./ConfigLoader.js');

// Main Class
//------------
function AFScrapper(){
	
	// Loading Configuration	
	Config.load({variable : "fora", file : "./config/forum.json"});
	Config.load({variable : "keywords", file : "./config/keywords.json"});

}

// Launching the process
//----------------------
module.exports = new AFScrapper();