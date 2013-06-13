/*
| -------------------------------------------------------------------
|  Timer Helper
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Version : 1.0
*/

// Dependancies
//=============


// Main Class
//===========
function Timer(){

	var self = this;


	// Time Counting
	//--------------

	// Fonction returning the elapsed time in a human readable format
	this.elapsed_time = function(){
		var machine_time = Math.floor(process.uptime());

		// Formatting
		return 'Process took '+this.seconds_to_time(machine_time);
	}

	// Convert seconds to time
	this.seconds_to_time = function(seconds){
		var sec_num = parseInt(seconds, 10);
	    var hours   = Math.floor(sec_num / 3600);
	    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	    var seconds = sec_num - (hours * 3600) - (minutes * 60);

	    if (hours   < 10) {hours   = "0"+hours;}
	    if (minutes < 10) {minutes = "0"+minutes;}
	    if (seconds < 10) {seconds = "0"+seconds;}
	    var time    = hours+' hours, '+minutes+' minutes, '+seconds+' seconds.';
	    return time;
	}

	// Triggering a display of time when the process is finished
	process.on('exit', function(){
		console.log(self.elapsed_time());
		console.log('');
	})


	// Sript Pausing
	//--------------

	// Milliseconds sleep
	this.usleepSync = function(milliseconds){
		var startTime = new Date().getTime();
		while(new Date().getTime() < startTime + milliseconds);
	}
	this.usleep = function(milliseconds, callback){
		setTimeout(callback, milliseconds);
	}

	// Seconds sleep
	this.sleepSync = function(seconds){
		this.usleep(seconds*1000);
	}
	this.sleep = function(seconds, callback){
		setTimeout(callback, seconds*1000);
	}

	// Minutes sleep
	this.msleepSync = function(minutes){
		this.sleep(minutes*60);
	}
	this.msleep = function(minutes, callback){
		setTimeout(callback, minutes*1000*60);
	}

	// Random second sleep
	this.randomSleepSync = function(min, max){
		var seconds = this.getRandomIntInRange(min, max);
		console.log(seconds);
		this.sleep(seconds);
	}
	this.randomSleep = function(min, max, callback){
		var seconds = this.getRandomIntInRange(min, max);
		setTimeout(callback, seconds*1000);
	}

	// Utilities
	//--------------
	this.getRandomIntInRange = function(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}


// Exporting
//==========
module.exports = new Timer();
