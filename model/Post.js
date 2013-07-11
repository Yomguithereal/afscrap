/*
| -------------------------------------------------------------------
|  Post Abstraction
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Organization : Medialab - Sciences-Po
|	Version : 1.0
*/

// Dependancies
//=============
var AFHelper = require('./AFHelper.js');

// Main Class
//===========
function Post(properties){
	
	var self = this;

	// Hydratation
	this.author = properties.author;
	this.title = properties.title;
	this.date = AFHelper.formatDate(properties.date, properties.date_salt);
	this.text = properties.text;

}

// Exporting
//===========
module.exports = Post;
