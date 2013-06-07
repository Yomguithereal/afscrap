/*
| -------------------------------------------------------------------
|  Aufeminin Functions helper
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
function AFHelper(){
	
	var self = this;


	// AF Format Date
	this.formatDate = function(encrypted_date, date_salt){
		
		// Using aufeminin.com's function
		var d = new Date();
		var o = d.getTime()-date_salt*1000;
		d.setTime(encrypted_date*1000+o);

		// Formatting Date
		var date = d.getDate();
		if(date.toString().length === 1){ date = "0"+date;}

		// Formatting Month
		var month = d.getMonth()+1;
		if(month.toString().length === 1){ month = "0"+month;}

		return date+'-'+month+'-'+d.getFullYear();
	}

}

// Exporting
//------------
module.exports = new AFHelper();
