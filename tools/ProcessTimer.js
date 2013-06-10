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
		return 'Process took '+this.seconds_to_time(machine_time);
	}

	// Convert seconds to time
	this.seconds_to_time = function(seconds){
		var sec_num = parseInt(seconds, 10); // don't forget the second parm
	    var hours   = Math.floor(sec_num / 3600);
	    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	    var seconds = sec_num - (hours * 3600) - (minutes * 60);

	    if (hours   < 10) {hours   = "0"+hours;}
	    if (minutes < 10) {minutes = "0"+minutes;}
	    if (seconds < 10) {seconds = "0"+seconds;}
	    var time    = hours+' hours, '+minutes+' minutes, '+seconds+' seconds.';
	    return time;
	}



}

var url = require('./URLGetter.js');


// Exporting
//------------
module.exports = new ProcessTimer();
