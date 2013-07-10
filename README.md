#Afscraper

##Presentation
Afscraper is a small node.js tool designed to crawl aufeminin's forums in order
to gather relevant pieces of information for social researches. Basically, it will
browse every threads of a particular forum and search them for some keywords.
The threads are then archived in a mongo database or in json format where considered
matched against keywords.

##Installation
To install Afscraper, simply clone it on your computer and install its dependancies.

```sh
git clone https://github.com/Yomguithereal/afscrap.git
cd afscrap
sudo npm install
```

##Workflow
Afscraper workflow is divided into two/three steps:

###1. Fetch the threads links from a particular forum
	
The first step is to determine a forum to scrap and get the url of its summary. Hence, you can
start checking the forum and get back urls corresponding to threads. 

The crawler will
start from the current date and stop when he has completed a full year. 

You can also limit the 
search to threads having a specified minimum of posts. 

The result will be a json file that you
will have to pass to step 2 to begin the real crawl.


Example:
```sh
node afscrap_forum -u/--url [url-of-forum-summary]

options : -m/--minimum [minimum-of-posts]
          -o/--output [output-directory], default: 'forum_lists/'
```



###2. Fetch the relevant threads

The second step consist in the actual crawl of the threads and the recuperation of the relevant
ones. 

The tool must be fed with a json file created by step 1 and a configuration file including
the keywords you want to match. 

The results can be outputed either to a local mongo database, either
to json files. 

You can use more than one process and go faster but be advised that you will reach
aufemin's sites limit very fast. Only increase processes on small thread lists. Moreover, take notice
that the url fetcher pauses for 3-5 seconds between each url to prevent being kicked by aufeminin.

The recuperation of threads can be interrupted and every results are cached. It is therefore possible to 
fetch your results in more than one time.


Example :
```sh
node afscrap_thread -l/--list [path-to-thread-list] -k/--keywords [path-to-keywords]

options : -f/--format [output-format], either json or mongo, default: mongo
          -o/--output [output-directory], default: 'output/' (if json)
          -p/--processes [nb-of-processes], default: 1
```



###3. (Optional) Compile results to text
	
If you decided to store your results in a mongo database, you may want to obtain only textual information
from the threads you gathered.

The third tool will therefore parse a result database and create text files from it.


Example:
```sh
node afscrap_compile -d/--database [name-of-database]

options : -o/--output [output-directory], default: name of your base
```

##Keywords
To register your keywords, you must create a json file respecting this format

```json
[
	"keyword-1"
	,"keyword-2"
	,"keyword-n"
]
```

##Proxy Configuration
If you want to configure a proxy, refer to config/config.example.json and just drop the .example part
when your proxy is specified.

##Dependancies
	
	node (>= 0.10.9)
	request
	cheerio
	colors
	commander
	mongoose
	async
	moment