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

// Dependencies
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
			return this.outputDate(d);			
		}
		else{
			return d;
		}
	}

	// Date Outputting
	this.outputDate = function(dateObject){

		// Formatting Date
		var date = dateObject.getDate();
		if(date.toString().length === 1){ date = "0"+date;}

		// Formatting Month
		var month = dateObject.getMonth()+1;
		if(month.toString().length === 1){ month = "0"+month;}

		return date+'-'+month+'-'+dateObject.getFullYear();
	}

	// AF's obfuscating function
	function jsdchtml3(s){
		if (!jsdchtml3.p) {
			String.prototype.afca = String.prototype['ch' + 'ar' + 'At'];
			jsdchtml3.k = '243524534235';
			jsdchtml3.ra = Array('º<', '¹>', '¦/');
			jsdchtml3.u = function(s) {
				if (!jsdchtml3.u.r) {
					jsdchtml3.u.r = Array();
					for (var i = 0, a; i < jsdchtml3.ra.length; i++) {
						a = jsdchtml3.ra[i].split('');
						jsdchtml3.u.r[i] = Array(new RegExp(a[0], 'gi'), a[1]);
					}
				}
				for (var i = 0; i < jsdchtml3.u.r.length; i++) s = s.replace(jsdchtml3.u.r[i][0], jsdchtml3.u.r[i][1]);
				return s;
			};
			jsdchtml3.r = function(a, b, c) {
				for (var j = c - 1, o = ''; j >= 0; j--) o += a.afca(b + j);
				return o;
			};
			jsdchtml3.p = function(f, a) {
				var t = jsdchtml3.u(f),
					i = 0,
					p = 0,
					n, o = '';
				while (p < t.length) {
					n = parseInt(a.afca(i++ % a.length));
					o += jsdchtml3.r(t, p, n);
					p += n;
				}
				return o;
			};
		}
		return (jsdchtml3.p(s, jsdchtml3.k));
	}

	// Deobfuscation function
	this.deobfuscate = function(s){
		return jsdchtml3(s);
	}


}

// Exporting
//------------
module.exports = new AFHelper();
