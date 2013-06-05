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
function Post(properties){
	
	var self = this;

	// Methods
	this.formatDate = function(encrypted_date){
		return encrypted_date;
	}

	// Hydratation
	this.author = properties.author;
	this.title = properties.title;
	this.date = new Date(properties.date);
	this.text = properties.text;

}

// Exporting
//------------
module.exports = Post;
