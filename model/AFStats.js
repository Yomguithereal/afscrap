/*
| -------------------------------------------------------------------
|  Afscrap Statistics
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Organization : Medialab - Sciences-Po
|	Version : 1.0
*/

// Dependencies
//=============
var colors = require('colors');
var async = require('async');
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var moment = require('moment');
var fs = require('fs');
var config = require('../tools/ConfigLoader');
var ThreadLine = require('./CSVTemplates').ThreadLine;

// Main Class
//===========
function AFStats(){

	// Object Configuration
	var self = this;
	this.connection = false;
	this.dbmodel = false;
	this.main_callback = false;
	this.schema = Schema({
		data : Schema.Types.Mixed
	});

	// Headers
	this.thread_report_header = ['title', 'original_author', 'lang', 'forum', 'start_date', 'end_date', 'range', 'nb_authors', 'nb_replies', 'avg_post_length', 'text_file', 'url'];
	this.author_report_header = ['author', 'nb_participations', 'nb_different_threads'];


	// Operation
	//-----------

	// Main Loop
	this.main_loop = function(){
		for(var lang in config.fora){

			// Operations
			config.fora[lang].forEach(function(base, index){

				// TO REMOVE
				// Loop Control
				// if(index == 0){
					self.base_analysis({name : base.name, lang: lang, index: index});
				// }
			});

			// TO REMOVE
			// Loop Control
			// break;
		}
	}

	// Analyze one base
	this.base_analysis = function(db){

		// Annoucing
		console.log(('Starting '+db.name+' analysis.').green);

		// Initializing connection
		this.connect_database(db.name);
		var thread_report = [this.thread_report_header];
		var author_report = {};
		
		// Fetching Threads
		this.dbmodel.find({}, function(err, docs){
			
			// Looping through threads
			docs.forEach(function(item, index){
				var thread = item.data;
				thread_report.push(new ThreadLine(thread, db).csv_line);

				// Checking authors
				thread.posts.forEach(function(post, index){
					if(!(post.author in author_report)){
						author_report[post.author] = {'name' : post.author, 'participations' : 1, 'different_threads' : 1, 'threads' : [index]};
					}
					else{
						author_report[post.author]['participations'] += 1;
						if(author_report[post.author]['threads'].indexOf(index) == -1){
							author_report[post.author]['threads'].push(index);
							author_report[post.author]['different_threads'] += 1;
						}
					}
				});
			});

			final_author_report = [self.author_report_header];
			for(var i in author_report){
				var author = author_report[i];
				final_author_report.push([author.name, author.participations, author.different_threads]);
			}

			// Close the connection
			self.write_report(thread_report, db.name, 'threads');
			self.write_report(final_author_report, db.name, 'authors');
			self.connection.close();
		});

	}

	// Reporting
	this.write_report = function(report_array, db_name, type){

		// Create the file
		fs.writeFile('stats/'+db_name+'_'+type+'.csv', report_array.join('\n'));
	}

	// Process Execution
	this.exec = function(callback){
		this.main_callback = callback;
		this.main_loop();
	}


	// Helpers
	//---------

	// Database connection
	this.connect_database = function(db_name){

		// Loading database
		this.connection = mongoose.createConnection('mongodb://localhost/'+db_name);
		this.dbmodel = this.connection.model('threads', this.schema);
	}

}

// Exporting
//==========
module.exports = new AFStats();