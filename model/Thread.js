/*
| -------------------------------------------------------------------
|  Thread Abstraction
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
function Thread(thread, callback){
	
	var self = this;
	var $ = false;

	// Paths
	this.pagination_path = 'table.aff_navHigh';
	this.main_post_path = 'table.aff_topicList';
	this.main_date_path = 'span.aff_date > script';
	this.author_path = 'span.aff_author';
	this.post_path = 'p.aff_contenu';

	// Properties
	this.base_url = thread.url;
	this.num_posts = thread.posts;
	this.num_authors = thread.authors;

	this.hasPagination = false;
	this.nextPage = false;
	this.isLastPage = false;
	this.posts = [];

	// Base Loop
	//------------
	this.loop_through_thread = function(callback){
		url_getter.fetch(self.base_url, function(data){

			// Loading Cheerio
			$ = cheerio.load(data);

			// Checking the existence of a pagination
			self.checkPagination();

			// Getting main post's information
			self.getMainPost();

			// self.dump();

			// If thread hasn't pagination and is relevant
			if(!self.hasPagination){
				self.output();
				return false;
			}

			// Going throught pagination

		});
	}


	// Utilities
	//------------

	// Initializing loop
	this.loop_through_thread();

	// Searching for pagination
	this.checkPagination = function(){

		// Getting main nav
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
	}

	// Getting basic post information
	this.getMainPost = function(){

		// Hydratation of Post
		var MainPost = new Post({
			title : $(self.main_post_path).find('h1').eq(0).text()
			,author : $(self.author_path).eq(0).text()
			,date : $(self.main_date_path).eq(0).html().match(/aff_FormatDate\(([^,]+),/)[1]
			,text : $(self.post_path).eq(0).html()
		});
		self.posts.push(MainPost);

		console.log(MainPost);

	}

	// Outputting
	this.output = function(){

		// Async to text file
		// console.log('Outputting...');
	}

	// Dumping
	this.dump = function(){

		// To remove
		console.log('');
		console.log(self.base_url);
		console.log('pagination? :: '+self.hasPagination);
		console.log('last_page? :: '+self.isLastPage);
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
module.exports = Thread;

