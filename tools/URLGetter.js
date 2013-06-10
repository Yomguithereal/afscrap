/*
| -------------------------------------------------------------------
|  Request module usage abstraction
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Organization : Medialab - Sciences-Po
|	Version : 1.0
*/

// Dependancies
//-------------
var request = require('request');

// Main Class
//------------
function URLGetter(){

	var self = this;

	// Acceptable HTTP Code
	this.acceptable_http_code = [200, 304];


	// Getting the html
	this.fetch = function(url, callback){

		// Sleeping for random between 0 - 2 seconds
		var seconds = Math.floor((Math.random()*3))*1000;
		var milliseconds = Math.floor((Math.random()*1000));
		this.sleep(seconds+milliseconds);

		// Using request
		request(url, function(error, response, body){
			try{

				// Testing error
				if(error){
					throw "Connection";
				}
				else if(self.acceptable_http_code.indexOf(response.statusCode) == -1){
					throw "Http"
				}
			}
			catch(e){
				switch(e){
					case "Connection" :
						console.log(("Connection error : "+error).red);
						callback(false);
						break;
					case "Http" :
						console.log(("The page is not valid : code "+response.statusCode).red);
						callback(false);
						break;
				}
			}

			// 

			// Sending Data
			callback(body, response.statusCode);

		});
	}

	// Timeout function
	this.sleep = function(milliseconds){
		var startTime = new Date().getTime();
		while(new Date().getTime() < startTime + milliseconds);

	}
	
}

// Exporting
//------------
module.exports = new URLGetter();

