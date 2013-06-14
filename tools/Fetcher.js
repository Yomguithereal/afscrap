/*
| -------------------------------------------------------------------
|  URL Fetcher
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Organization : Medialab - Sciences-Po
|	Version : 1.0
*/

// Dependancies
//=============
var request = require('request');
var colors = require('colors');
var timer = require('./Timer');
var log = require('./Logger');
var config = require('./ConfigLoader');

// Main Class
//===========
function Fetcher(){

	var self = this;

	// Acceptable HTTP Code
	this.acceptable_http_code = [200, 304];
	this.proxy = false;
	this.timeout_range = [2, 4];

	// Updating proxy
	if(config.extern !== undefined){
		this.proxy = config.extern.proxy;
	}

	// Getting the html
	this.get = function(target, callback){

		// We pause in range
		timer.randomSleep(this.timeout_range[0], this.timeout_range[1], launch);
		
		// Launching request
		function launch(){
			
			var opts = {
				proxy : self.proxy
				,url : target
			}

			// Triggering request module
			request(opts, function(error, response, body){
				try{
					if(error){
						throw 'connection';
					}
					else if(self.acceptable_http_code.indexOf(response.statusCode) == -1){
						throw 'http';
					}
				}
				catch(e){
					switch(e){
						case 'connection' :
							console.log('Connection Error! Aborting Process'.red);
							process.exit();
							break;
						case 'http' :
							console.log(("The page ("+target+") is not valid : code "+response.statusCode).red);
							log.write(target+' is not valid. Code : '+response.statusCode, 'error');
							callback(false);
							return false;
							break;
					}
				}

				// Everything went fine, we give the data back
				callback(body, response.statusCode);
				return false;
			});
		}
	}
	
}

// Exporting
//==========
module.exports = new Fetcher();

