/*
| -------------------------------------------------------------------
|  Error Logger
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Version : 1.0
*/

// Dependencies
//=============
var fs = require('fs');

// Main Class
//===========
function Logger(){

	// Work properties
	this.directory = './logs';
	this.file = 'log.txt';
	this.check = false;

	// Methods
	this.write = function(text, level){
		level = level || 'debug';
		this.check_directory();
		var message = new Date()+' -- '+level+' :: '+text+'\n';
		fs.appendFile(this.directory+'/'+this.file, message);
	}

	this.check_directory = function(){
		if(!this.check){
			if(!fs.existsSync(this.directory)){
				fs.mkdirSync(this.directory);
				this.check = true;
			}
		}
	}
}


// Exporting
//==========
module.exports = new Logger();
