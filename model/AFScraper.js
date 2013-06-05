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
var ForumPage = require('./ForumPage.js');
var ThreadPage = require('./ThreadPage.js');

// Main Class
//------------
function AFScraper(){
	
	// Loading Configuration	
	Config.load({variable : "fora", file : "./config/forum.json"});
	Config.load({variable : "keywords", file : "./config/keywords.json"});

	// Methods
	this.fetchForum = function(url, callback){

		// TODO : Balancer la boucle de batch ici

		// On appelle la première page du forum
		var current_forum_page = new ForumPage(Config.fora[0].url, function(){
			console.log(current_forum_page.pages_to_visit);
		});
	}

}

// Launching the process
//----------------------
module.exports = new AFScraper();