/*
| -------------------------------------------------------------------
|  Argv Parser - Commander Module Extension
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Version : 1.0
*/

// Dependancies
//=============
var colors = require('colors');
var Command = require('commander').Command;
var config = require('./ConfigLoader');

// Main Methods
//=============

// Checking existence of required argument
Command.prototype.check = function(arg, custom_message){
	custom_message = (custom_message === undefined) ? ('Error :: the ['+arg+'] argument is required.').red : custom_message;
	if(this[arg] === undefined){
		console.log(custom_message);
		process.exit();
	}

	return this;
}

// Checking against a concept
Command.prototype.checkAgainst = function(arg, concept, message){
	if(this[arg] !== undefined){
		if(!concept(this[arg])){
			console.log(('Error :: '+message).red);
			process.exit();
		}
	}
	return this;
}

// Assigning default value
Command.prototype.assign = function(arg, def){
	if(!this[arg]){
		this[arg] = def;
	}
	return this;
}

// Transferring to Configuration
Command.prototype.toConfig = function(){
	for(var i = 0; i < arguments.length; i++){
		config[arguments[i]] = this[arguments[i]];
	}
	return this;
}


// Exporting
//==========
module.exports = new Command();
