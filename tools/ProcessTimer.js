/*
| -------------------------------------------------------------------
|  Process Timer
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
function ProcessTimer(){

	var self = this;

	// Fonction returning the elapsed time in a human readable format
	this.elapsed_time = function(){
		var machine_time = Math.floor(process.uptime());

		// Formatting
		var minutes = machine_time / 60;
		if(minutes > 1){
			var unit_of_time = Math.floor(minutes)+' minute(s)';
		}
		else{
			var unit_of_time = machine_time+' second(s)';
		}

		return 'Process took '+unit_of_time+'.';
	}


}

var url = require('./URLGetter.js');


// Exporting
//------------
module.exports = new ProcessTimer();
