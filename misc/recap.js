var fs = require('fs');
var config = require('../tools/ConfigLoader');

function sortJSON(data, key) {
    return data.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

var files = fs.readdirSync('../forum_lists');
var files = files.filter(function(el){ return ['afora.json', 'aforum_test.json'].indexOf(el) == -1; });

var out = {'fr':[], 'it':[], 'en':[]};
files.forEach(function(item){
	config.load('list', './forum_lists/'+item);
	el = config.list;
	out[item.substring(0,2)].push({
		url : el.url,
		nb_threads : el.nb_threads,
		start_date : el.start_date,
		end_date : el.end_date
	});

});

var fr = sortJSON(out.fr, 'nb_threads');
var it = sortJSON(out.it, 'nb_threads');
var en = sortJSON(out.en, 'nb_threads');
out.fr = fr;
out.it = it;
out.en = en;

fs.writeFileSync('../forum_lists/arecapitulatif.json', JSON.stringify(out));