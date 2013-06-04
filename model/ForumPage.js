/*
| -------------------------------------------------------------------
|  Forum Page Abstraction
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Organization : Medialab - Sciences-Po
|	Version : 1.0
*/

// Deoendancies
//-------------
var url_getter = require('./URLGetter.js');
var cheerio = require('cheerio');

// Main Class
//------------
function ForumPage(url, callback){

	var self = this;

	// Paths
	this.thread_link = 'td.aff_message > a.aff_message';

	// Pages to fetch within this page
	this.pages_to_visit = [];

	// Get next page
	var search = url.match("forum\/([^\/]+)\/");
	var next_page_number = parseInt(search[1].slice(-1))+1;
	this.next_page_url = url.replace(search[1], search[1].slice(0, -1)+next_page_number);


	// Getting the html
	url_getter.fetch(url, function(data){
		if(data){
			
			// Loading Cheerio
			$ = cheerio.load(data);

			// Checking on the page if the next page exists
			if(data.search(self.next_page_url) == -1){
				self.next_page_url = false;
			}
			
			// Iteration through thread list
			$(self.thread_link).each(function(i){
				
				var href = $(this).attr("href");

				if(href != "#"){

					// Dropping Ads and irrelevant targets
					self.pages_to_visit.push(href);
				}

			});
		}
	});
	
	console.log(this.next_page_url);

}
new ForumPage("http://www.aufeminin.com/forum/show1_matern1_300/grossesse/grossesse-attendre-bebe.html");

// Exporting
//------------
module.exports = ForumPage;

