var c = require('../tools/ConfigLoader');

c.load('fora', 'forum_lists/arecapitulatif.json');

for(var lang in c.fora){
	c.fora.lang = c.fora[lang].map(function(item){
		var nb = item['nb_reduced'] || item['nb_threads'];
		item['relevance'] = Math.floor( ((item['results']*100)/nb)*100 )/100;
		return item;
	});
}

var fs = require('fs');
fs.writeFileSync('test.json', JSON.stringify(c.fora));