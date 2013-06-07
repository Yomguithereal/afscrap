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
	this.thread_first_path = "table.aff_topicList > tr.aff_rowfirst";
	this.thread_list_path = "table.aff_topicList > tr.aff_row:not(.aff_rowAd)";
	this.nav_path = '.aff_navHigh';


	// Properties
	this.from_date = new Date();
	this.base_url = url;
	this.pages_to_visit = [];
	this.name = false;
	this.max_date = max_date;
	this.backEnough = false;
	this.next_page_url = false;
	this.current_page = 1;
	console.log(this.base_url);


	// Base Loop
	//------------
	this.loop_through_forum = function(url, isFirstPage){

		url_getter.fetch(url, function(data, code){

			// Loading Cheerio
			$ = cheerio.load(data);

			// Determining the next page
			var search = url.match("forum\/([^\/]+_([0-9]+))\/");
			if(!self.name){ self.name = search[1]; }
			self.current_page += 1;
			self.next_page_url = url.replace("_"+search[2]+"/", "_"+self.current_page+"/");

			// Getting the threads
			self.getThreads();
			console.log(self.pages_to_visit);

			// Outputting if we are back enough in time
			if(self.backEnough || code == 404){
				
				// Outputting
				console.log('Outputting');
				return false;
			}

			// Going through pagination
			// self.loop_through_forum(self.next_page_url, false);

		});
	}





	// Utilities
	//------------

	// Initializing loop
	this.loop_through_forum(this.base_url, true);

	// Getting the threads
	this.getThreads = function(){

		// Getting the first thread
		self.pages_to_visit.push({
			'url' : $(self.thread_first_path).find('.aff_message > a').attr('href')
		});

		// Looping through the main table
		$(self.thread_list_path).each(function(i){

			// Checking the date and stopping if necessary

			// Getting the url
			var url = $(this).find('.aff_message > a').attr('href');
			if(url !== undefined){
				self.pages_to_visit.push({
					'url' : url
				});
			}
		});
	}

	// Outputting results
	this.output = function(){

		// Writing to file
		var filename = output_directory+'/'+this.name+"_"+this.pages_to_visit.length;

		// Writing
		fs.writeFile(filename, JSON.stringify(this.pages_to_visit), function(err){
			if(err){
				console.log('Error outputting '+self.base_url+' forum.');
			}
		});
	}
}

// Tests
//------
function test(){
	new Forum('http://www.aufeminin.com/forum/show1_matern1_1/grossesse/grossesse-attendre-bebe.html');
}

// Launching on main
if(require.main === module){
	test();
}


// Exporting
//------------
module.exports = Forum;

