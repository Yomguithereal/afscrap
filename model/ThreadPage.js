/*
| -------------------------------------------------------------------
|  Thread Page Abstraction
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Organization : Medialab - Sciences-Po
|	Version : 1.0
*/

// Dependancies
//-------------
var url_getter = require('./URLGetter.js');
var cheerio = require('cheerio');
var Post = require('./Post.js');

// Main Class
//------------
function ThreadPage(url, keywords, callback){
	
	var self = this;

	// Paths
	this.pagination_path = 'table.aff_navHigh';

	// Properties
	this.hasPagination = false;
	this.nextPage = false;
	this.isLastPage = false;
	this.author = false;
	this.date = false;
	this.posts = [];

	// Looping function
	this.loop_through_thread = function(url, callback){
		url_getter.fetch(url, function(data){

			// Loading Cheerio
			var $ = cheerio.load(data);

			// Checking the existence of a pagination
			var $nav = $(self.pagination_path).find("table");
			if($nav.length > 0){
				self.hasPagination = true;

				// Getting the next page
				var next_page_link = $nav.find('b').next('a').attr("href");
				if(next_page_link !== undefined){
					self.nextPage = next_page_link;
				}
				else{
					self.nextPage = false;
					self.isLastPage = true;
				}
			}
			else{
				self.isLastPage = true;
			}

			self.dump();

			// If thread hasn't pagination and is relevant
			if(!self.hasPagination){
				self.output();
				return false;
			}

			// Going throught pagination

		});
	}

	// Initializing loop
	this.loop_through_thread(url);

	// Outputting
	this.output = function(){

		// Async to text file
		console.log('Outputting...');
	}

	// Dumping
	this.dump = function(){

		// To remove
		console.log('');
		console.log(url);
		console.log('');
	}
}

// Tests
//------------
var test = function(){

}

if(require.main === module){
	test();
}



// Exporting
//------------
module.exports = ThreadPage;

