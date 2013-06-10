/*
| -------------------------------------------------------------------
|  Forum Abstraction
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
var AFHelper = require('./AFHelper.js');

// Main Class
//------------
function Forum(url, output_directory, max_date, callback){


	// Object Configuration
	//---------------------

	var self = this;
	var $ = false;

	// Paths
	this.thread_first_path = "table.aff_topicList > tr.aff_rowfirst";
	this.thread_list_path = "table.aff_topicList > tr.aff_row:not(.aff_rowAd)";
	this.nav_path = '.aff_navHigh';


	// Properties
	var current_date = new Date();

	this.date_to_reach = new Date();
	this.date_to_reach.setMonth(current_date.getMonth() - 12);
	this.base_url = url;
	this.pages_to_visit = [];
	this.name = false;
	this.current_salt = false;
	this.max_date = max_date;
	this.backEnough = false;
	this.next_page_url = false;
	this.current_page = 1;
	console.log('Getting :: '.blue+this.base_url);


	// Base Loop
	//------------
	this.loop_through_forum = function(url, isFirstPage){

		url_getter.fetch(url, function(data, code){

			// Loading Cheerio
			$ = cheerio.load(data);

			// Getting date salt
			self.current_salt = data.match(/aff_FormatDate.sd=([^;]+);/)[1];

			// Determining the next page
			var search = url.match("forum\/([^\/]+_([0-9]+))\/");
			if(!self.name){ self.name = search[1]; }
			self.current_page += 1;
			self.next_page_url = url.replace("_"+search[2]+"/", "_"+self.current_page+"/");

			// Getting the threads
			self.getThreads();

			// Outputting if we are back enough in time
			if(self.backEnough || code == 404){
				
				// Outputting
				self.output();
				return false;
			}

			// Going through pagination
			console.log('Getting :: '.blue+self.next_page_url);
			self.loop_through_forum(self.next_page_url, false);

		});
	}





	// Utilities
	//------------

	// Initializing loop
	this.loop_through_forum(this.base_url, true);

	// Getting the threads
	this.getThreads = function(){

		// Getting the first thread
		var first_url = $(self.thread_first_path).find('.aff_message > a').attr('href');
		if(first_url !== undefined){
			self.pages_to_visit.push({
				'url' : first_url
			});
		}

		// Looping through the main table
		$(self.thread_list_path).each(function(i){

			// Checking the date and stopping if necessary
			var encrypted_date = $(this).find('.aff_dateHeure > script').html().match(/aff_FormatDate\(([^,]+),/)[1];
			var date = AFHelper.formatDate(encrypted_date, self.current_salt, true);

			if(date <= self.date_to_reach){
				self.backEnough = true;
				return false;
			}

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

		// Logging
		console.log("Outputting...".green);

		// Writing to file
		var filename = output_directory+'/'+this.name+"_"+this.pages_to_visit.length+'.json';

		// Writing
		fs.writeFile(filename, JSON.stringify(this.pages_to_visit), function(err){
			if(err){
				console.log(('Error outputting '+self.base_url+' forum.').red);
			}
		});
	}
}

// Tests
//------
function test(){
	new Forum('http://www.aufeminin.com/forum/show1_matern1_1/grossesse/grossesse-attendre-bebe.html', '../output/');
}

// Launching on main
if(require.main === module){
	test();
}


// Exporting
//------------
module.exports = Forum;

