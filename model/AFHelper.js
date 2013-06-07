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
	this.formatDate = function(encrypted_date, date_salt, return_object){

		return_object = return_object || false;
		
		// Using aufeminin.com's function
		var d = new Date();
		var o = d.getTime()-date_salt*1000;
		d.setTime(encrypted_date*1000+o);

		// Selecting return
		if(!return_object){

			// Formatting Date
			var date = d.getDate();
			if(date.toString().length === 1){ date = "0"+date;}

			// Formatting Month
			var month = d.getMonth()+1;
			if(month.toString().length === 1){ month = "0"+month;}

			return date+'-'+month+'-'+d.getFullYear();
		}
		else{
			return d;
		}
	}

}

// Exporting
//------------
module.exports = new AFHelper();
