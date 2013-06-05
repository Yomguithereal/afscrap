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
//-------------

// Main Class
//------------
function Post(author, title, date, text){
	
	var self = this;

	// Properties
	this.author = author;
	this.title = title;
	this.date = date;
	this.text = text;

}

// Exporting
//------------
module.exports = Post
