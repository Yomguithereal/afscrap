/*
| -------------------------------------------------------------------
|  Forum Parser
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Organization : Medialab - Sciences-Po
|	Version : 1.0
*/

// Dependancies
//=============
var fs = require('fs');
var colors = require('colors');
var cheerio = require('cheerio');
var Fetcher = require('../tools/Fetcher');
var AFHelper = require('./AFHelper');
var config = require('../tools/ConfigLoader');
var timer = require('../tools/Timer');

// Main Class
//===========
function Forum(url, callback){


	// Object Configuration
	//---------------------

	var self = this;
	var $ = false;

	// Paths
	this.thread_first_path = "table.aff_topicList > tr.aff_rowfirst";
	this.thread_list_path = "table.aff_topicList > tr.aff_row:not(.aff_rowAd)";
	this.nav_path = '.aff_navHigh';


	// Properties
	this.current_date = new Date();
	this.date_to_reach = new Date();
	this.date_to_reach.setMonth(this.current_date.getMonth() - 12);

	this.min_posts = config.minimum || false;

	this.base_url = url;
	this.pages_to_visit = [];
	this.name = false;
	this.current_salt = false;
	this.backEnough = false;
	this.next_page_url = false;
	this.current_page = 1;

	// Quick Message
	console.log('Getting :: '.blue+this.base_url);

	// Base Loop
	//------------
	this.loop_through_forum = function(url, isFirstPage){

		Fetcher.get(url, function(data, code){

			// If no data
			if(!data){
				self.output();
				return false;
			}

			// Parsing with cheerio
			$ = cheerio.load(data);

			// Checking if we are kicked
			if($('div.captcha').length > 0){
				console.log('Error :: Aufeminin\'s limit reached.'.red);
				
				// Waiting
				console.log('Waiting 3 minutes before starting again.'.blue);
				timer.msleepSync(3);
				self.loop_through_forum(self.next_page_url, isFirstPage);
				return false;
			}

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

			var script = $(this).find('.aff_dateHeure > script').html();

			// Checking the date and stopping if necessary
			var encrypted_date = script.match(/aff_FormatDate\(([^,]+),/)[1];
			var date = AFHelper.formatDate(encrypted_date, self.current_salt, true);

			if(date <= self.date_to_reach){
				self.backEnough = true;
				return false;
			}

			// Checking the number of posts
			var number_of_posts = script.match(/aff_addNbRep\([^,]+,([^)]+)/)[1];

			// Getting the url
			var url = $(this).find('.aff_message > a').attr('href');
			if(url === undefined){

				// De-obfuscating threads with no replies
				// TODO :: gérer les problèmes de décryptage foireux
				var encrypted_link = $(this).find('.aff_message > script').text();
				encrypted_link = encrypted_link.replace("jsdchtml3('", "").replace("');", "");
				url = AFHelper.deobfuscate(encrypted_link).match(/href="([^"]+)"/)[1];
			}

			// Pushing to array
			if(!self.min_posts){
				self.pages_to_visit.push({
					'url' : url
				});
			}
			else{
				if(number_of_posts >= self.min_posts){
					self.pages_to_visit.push({
						'url' : url
					});
				}
			}
			

		});
	}

	// Outputting results
	this.output = function(){

		// Logging
		console.log("Outputting...".green);

		// Writing to file
		var filename = config.output+'/'+this.name+'.json';

		// Compiling some metadatas
		var json = {
			url : this.base_url,
			nb_threads : this.pages_to_visit.length,
			start_date : AFHelper.outputDate(this.current_date),
			end_date : AFHelper.outputDate(this.date_to_reach),
			threads : this.pages_to_visit
		};

		console.log('Threads :: '.green+json.nb_threads);

		// Writing
		fs.writeFile(filename, JSON.stringify(json), function(err){
			if(err){
				console.log(('Error outputting '+self.base_url+' forum.').red);
			}

			// Triggering Callback
			callback(filename);
		});
	}
}


// Exporting
//==========
module.exports = Forum;

