// Script used to clean date wrongly decrypted by AF's functions

var config = require('../tools/ConfigLoader');

config.load('list', '../forum_lists/fr_bebe_est_la.json');

config.list.threads.forEach(function(item){
	if(item.url.search(/>/) > -1){
		var cleaned_url = item.url.replace(/.html>.*/, '.html');
		console.log(cleaned_url);
	}
});