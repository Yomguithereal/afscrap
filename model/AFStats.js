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

// Dependancies
//=============
var colors = require('colors');
var async = require('async');
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var moment = require('moment');
var fs = require('fs');
var config = require('../tools/ConfigLoader');

// Main Class
//===========
function AFStats(){

	// Object Configuration
	var self = this;
	this.connection = false;
	this.main_callback = false;
	this.schema = Schema({
		data : Schema.Types.Mixed
	});
	this.date_format = 'DD-MM-YYYY';
	this.output = 'statreport.json';


	// Operation
	//-----------

	// Main Loop
	this.main_loop = function(){
		for(var lang in config.fora){

			// Operations
			config.fora[lang].forEach(function(base, index){;
				self.base_analysis({name : base.name, lang: lang, index: index});
			});

			// Write Report
			this.write_report();

			// Closing
			this.main_callback();
		}
	}

	// Analyze one base
	this.base_analysis = function(db){

		// Initializing connection
		var threads_model = this.connect_database(db.name);
		
		// Looping through threads

	}

	// Reporting
	this.write_report = function(){

		// Base on config.fora
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

		// Checking existant connection
		if(this.connection !== false){
			this.connection.close();
		}

		// Loading database
		this.connection = mongoose.createConnection('mongodb://localhost/'+db_name);
		return this.connection.model('threads', this.schema);
	}

}

// Exporting
//==========
module.exports = new AFStats();