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

	this.date_salt = properties.date_salt;

	// Methods
	this.formatDate = function(encrypted_date){
		
		// Using aufeminin.com's function
		var d = new Date();
		var o = d.getTime()-this.date_salt*1000;
		d.setTime(encrypted_date*1000+o);
		console.log(d);

		return d;
	}

	// Hydratation
	this.author = properties.author;
	this.title = properties.title;
	this.date = this.formatDate(properties.date);
	this.text = properties.text;

}

// Exporting
//------------
module.exports = Post;
