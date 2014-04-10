/*
| -------------------------------------------------------------------
|  CSV Templates For Stats
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Organization : Medialab - Sciences-Po
|	Version : 1.0
*/

// Dependencies
//=============
var moment = require('moment');


// Thread Stats
//=============
exports.ThreadLine = function(thread, db){

	// Operations
	//------------
	var cleansing_regex = new RegExp('<[^>]+>', 'gi');

	// Date formatting
	function create_moment(date){
		return moment(date, 'DD-MM-YYYY');
	}

	function format_date(moment){
		return moment.format('YYYYMMDD');
	}

	// Range calculus
	function get_range(from_moment, to_moment){
		return to_moment.diff(from_moment, 'day');
	}

	// How many different authors
	function different_authors(posts){
		var authors = [];
		posts.forEach(function(post){
			if(authors.indexOf(post.author) == -1){
				authors.push(post.author);
			}
		});
		return authors.length;
	}

	// Post length average
	function avg_post_length(posts){
		var avg = {'total' : 0, 'nb' : 0};
		posts.forEach(function(post){
			avg['nb'] += 1;
			avg['total'] += post.text.replace(cleansing_regex, '').length;
		});

		avg['nb'] = (avg['nb'] == 0) ? 1 : avg['nb'];
		return Math.floor(avg['total']/avg['nb']);
	}


	// Hydration
	//-----------

	// Basic Metadata
	this.title = thread.title;
	this.url = thread.url;
	this.original_author = thread.author;
	this.text_file = thread.date+'__'+this.original_author+'__'+escape(this.title)+'__'+db.name+'.txt';
	this.lang = db.lang;
	this.forum = db.name;

	// Date and timing
	var start_moment = create_moment(thread.date);
	var end_moment = create_moment(thread.posts.pop().date);
	this.start_date = format_date(start_moment);
	this.end_date = format_date(end_moment);
	this.range = get_range(start_moment, end_moment);

	// Authors
	this.authors = different_authors(thread.posts);

	// Posts
	this.num_replies = thread.posts.length;
	this.avg_post_length = avg_post_length(thread.posts);

	// Csv Array
	//-----------
	this.csv_line = [
		this.title,
		this.original_author,
		this.lang,
		this.forum,
		this.start_date,
		this.end_date,
		this.range,
		this.authors,
		this.num_replies,
		this.avg_post_length,
		this.text_file,
		this.url
	].map(function(item){ return '"'+String(item).replace(/"/g, '""')+'"'}).join(',');
}