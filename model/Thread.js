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
var fs = require('fs');
var url_getter = require('../tools/URLGetter.js');
var cheerio = require('cheerio');
var Post = require('./Post.js');

// Main Class
//------------
function Thread(url, output_directory, keywords, callback){


	// Object Configuration
	//---------------------

	var self = this;
	var $ = false;
	this.by_author_string = /par : |da: |by:/;

	// Paths
	this.pagination_path = 'table.aff_navHigh';
	this.post_path = 'table.aff_topicList';
	this.date_path = 'span.aff_date > script';
	this.author_path = 'span.aff_author';
	this.generic_post_path = '.aff_blocRepNiv1:not(.aff_blocRepAd), .aff_blocRepNiv2:not(.aff_blocRepAd), .aff_blocRepNiv3:not(.aff_blocRepAd)';
	this.post_content_path = 'p.aff_contenu';

	// Properties
	this.base_url = url;
	this.num_posts = false;
	this.num_authors = false;

	this.hasPagination = false;
	this.nextPage = false;
	this.isLastPage = false;
	this.current_salt = false;
	this.posts = [];



	// Base Loop
	//------------
	this.loop_through_thread = function(url, isFirstPage){

		url_getter.fetch(url, function(data){

			// Loading Cheerio
			$ = cheerio.load(data);

			// Checking the existence of a pagination
			self.checkPagination();

			// Getting current date salt
			self.current_salt = data.match(/aff_FormatDate.sd=([^;]+);/)[1];

			// Getting posts information
			if(isFirstPage){
				self.getMainPost();
			}
			self.getPosts();

			// If thread has only one page
			if(self.isLastPage){
				self.output();
				return false;
			}

			// Going throught pagination
			self.loop_through_thread(self.nextPage, false);

		});
	}





	// Utilities
	//------------

	// Initializing loop
	this.loop_through_thread(self.base_url, true);

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
			title : $(self.post_path).find('h1').eq(0).text()
			,author : $(self.author_path).eq(0).text()
			,date : $(self.date_path).eq(0).html().match(/aff_FormatDate\(([^,]+),/)[1]
			,text : $(self.post_content_path).eq(0).html()
			,date_salt : self.current_salt
		});
		self.posts.push(MainPost);
	}

	// Getting standard posts
	this.getPosts = function(){
		$(self.generic_post_path).each(function(){

			// Hydratation of Post
			var GenericPost = new Post({
				title : $(this).find('h2').eq(0).text()
				,author : $(this).find(self.author_path).eq(0).text().replace(self.by_author_string, '')
				,date : $(this).find(self.date_path).eq(0).html().match(/aff_FormatDate\(([^,]+),/)[1]
				,text : $(this).find(self.post_content_path).eq(0).html()
				,date_salt : self.current_salt
			});
			self.posts.push(GenericPost);
		});
	}

	// Outputting
	this.output = function(){

		// Async to text file
		console.log('Outputting '.green+self.base_url+' thread.');

		// Formatting
		var thread_output = {
			'url' : this.base_url,
			'title' : this.posts[0].title,
			'author' : this.posts[0].author,
			'date' : this.posts[0].date,
			'num_posts' : this.num_posts,
			'num_authors' : this.num_authors,
			'posts' : this.posts
		}

		var filename = output_directory+'/'+escape(thread_output.title)+'_'+thread_output.date+'_'+thread_output.author;

		// Writing
		fs.writeFile(filename, JSON.stringify(thread_output), function(err){
			if(err){
				console.log(('Error outputting '+self.base_url+' thread.').red);
			}

			// Trigerring callback
			callback();

			// Releasing Memory
			delete this;
		});


		
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


// Exporting
//------------
module.exports = Thread;

