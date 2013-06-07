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
						console.log("Connection error : "+error);
						callback(false);
						break;
					case "Http" :
						console.log("The page is not valid : code "+response.statusCode);
						callback(false);
						break;
				}
			}

			// Sending Data
			callback(body);

		});
	}
	
}

// Exporting
//------------
module.exports = new URLGetter();

