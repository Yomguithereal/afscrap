var config = require('../tools/ConfigLoader');

config.load('list', '../forum_lists/fr_bebe_est_la.json');

config.list.threads.forEach(function(item){
	if(item.url.search(/>/) > -1){
		console.log(item.url);
	}
});