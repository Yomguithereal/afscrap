/*
| -------------------------------------------------------------------
|  Froum Abstraction
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
var url_getter = require('../tools/URLGetter.js');
var cheerio = require('cheerio');

// Main Class
//------------
function Forum(url, max_date, output_directory, callback){


	// Object Configuration
	//---------------------

	var self = this;
	var $ = false;

	// Paths
	this.thread_link = 'td.aff_message > a.aff_message';


	// Properties
	this.base_url = url;
	this.pages_to_visit = [];
	this.max_date = max_date;
	this.backEnough = false;

	// Next Page
	var search = url.match("forum\/([^\/]+)\/");
	var next_page_number = parseInt(search[1].slice(-1))+1;
	this.next_page_url = url.replace(search[1], search[1].slice(0, -1)+next_page_number);





	// Base Loop
	//------------
	this.loop_through_forum = function(url, isFirstPage){

		url_getter.fetch(url, function(data){

			// Loading Cheerio
			$ = cheerio.load(data);

			// Checking on the page if the next page exists
			if(data.search(self.next_page_url) == -1){
				self.backEnough = true;
			}


			// Looping
			if(self.backEnough){

				// Outputting
				return false;
			}

			// Going through pagination
			self.loop_through_forum(self.next_page_url, false);

		});
	}





	// Utilities
	//------------

	// Initializing loop
	// this.loop_through_thread(this.base_url, true);
}


// Exporting
//------------
module.exports = Forum;

