require("dotenv").config();
var fs = require('fs');
var keys = require ('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var omdb = require('omdb');
var request = require('request');
var Session = require('./session.js');
var txt = require('./text.js');
var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);


var session;

var liri = {
	cmd: process.argv[2],
	input: '',
	init: function() {
		for (var i = 3; i < process.argv.length; i++) {
			this.input += process.argv[i] + ' ';
		}
		this.input = this.input.trim();
		this.createSession(this.cmd,this.input);
		this.action();
	},
	createSession: function(cmd,input){
		session = new Session(cmd,input,{});
		// session.print();
	},
	action: function() {
		switch (this.cmd) {
			
			case 'my-tweets':
				this.tweets();				
			break;

			case 'spotify-this-song':
				this.spotify(this.input);
			break;

			case 'movie-this':
				this.movie(this.input);
			break;

			case 'do-what-it-says':
				this.rando();
			break;

			case 'history':
				session = new Session();
				session.history(this.input);
			break;

			default:
				console.log(txt.separator);
				console.log(txt.color.red + 'Sorry, I need to know what you want to do. I know the following commands:' + txt.color.reset);
				console.log(txt.separatorplain);
				console.log(txt.color.green + 'my-tweets' + txt.color.reset + ' - Display tweets.');
				console.log(txt.color.green + 'spotify-this-song' + txt.color.cyan + ' song name' + txt.color.reset + ' - Check spotify for a song.');
				console.log(txt.color.green + 'movie-this' + txt.color.cyan + ' movie name' + txt.color.reset + ' - Check OMDB for info about a movie.');
				console.log(txt.color.green + 'do-what-it-says' + txt.color.reset + ' - If you feel lucky.');
				console.log(txt.color.green + 'history' + txt.color.cyan + txt.color.reset + txt.color.cyandim + ' [verbose]' + txt.color.reset + ' - See your LIRI search history. Use "history verbose" to list results.');
				console.log(txt.separatorplain);
				console.log(txt.separator);
		} // end switch
	}, // end action
	tweets: function(){ 
		console.log(txt.loading.tweets); 
		var params = {screen_name: 'hidden_ocean_18'};
		twitter.get('statuses/user_timeline', params, function(error, tweets, response){
			if (!error) {
				console.log(txt.loaded.tweets);
				console.log(txt.separator);
				console.log(txt.separatorplain);
				var tweetlength;
				if (tweets.length <= 10) {
					tweetlength = tweets.length;
				} else {
					tweetlength = 10;
				}
				for (var i = 0; i < tweetlength; i++) {
					console.log(txt.color.cyan + tweets[i].created_at + txt.color.white + '\n' + tweets[i].text + txt.color.reset);
					console.log(txt.separatorplain);
				}
				console.log(txt.separator);
				console.log('Updating session.');
				session.results = tweets;
				session.save(session);
			}
		});

	},
	spotify: function(arg){ 
		console.log(txt.loading.spotify);
		if ((!arg) || (arg == undefined)) {
			arg = 'The Sign';
		}
		spotify.search({ type: 'track', query: arg, limit: 8 }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  } else {
		  	console.log(txt.loaded.spotify + '\n' + txt.separator);
		  	var spotted = data.tracks.items;
		  	var spottedSession = [];
		  	if (spotted.length < 1) {
		  		console.log('No tracks for ' + arg + ' found. Sorry.');
		  		console.log(txt.separator);
		  	} else {
			  	for (var i = 0; i < spotted.length; i++) {
			  		var result = {
			  			album: spotted[i].album.name,
			  			song: spotted[i].name,
			  			artists: spotted[i].artists,
			  			preview: spotted[i].preview_url
			  		};
			  		spottedSession.push(result);
				  	console.log(txt.color.cyan + 'Album:       ' + txt.color.white + spotted[i].album.name);
				  	console.log(txt.color.cyan + 'Song Name:   ' + txt.color.white + spotted[i].name);
				  	for (var j = 0; j < spotted[i].album.artists.length; j++) {
				  		console.log(txt.color.cyan + 'Artist:      ' + txt.color.white + spotted[i].album.artists[j].name);
				  	}
				  	console.log(txt.color.cyan + 'Preview URL: ' + txt.color.white + spotted[i].preview_url + txt.color.reset);
				  	console.log(txt.separator);
			  	}
			  }
			  console.log('Updating session.');
				session.results = spottedSession;
				session.save(session);
		  }
		});
	},
	movie: function(arg){ 
		console.log(txt.loading.movie);
		if ((!arg) || (arg == undefined)) {
			arg = 'Mr. Nobody';
		}
		var queryUrl = 'http://www.omdbapi.com/?apikey=trilogy&t=' + encodeURIComponent(arg);
		// console.log(queryUrl);
		request(queryUrl, function(error, response, body){
			body = JSON.parse(body);
			if ((error) || body.Response == 'False') {
				if (error) {
					console.log(txt.color.red + 'Error occurred: ' + error + txt.color.reset);
				} else {
					console.log(txt.color.red + 'Error occurred: ' + body.Error + txt.color.reset);
				}
			} else {
				console.log(txt.loaded.movie);
				var ratingsImdb;
				var ratingsRotten;
				if (body.Ratings[0]) {
					ratingsImdb = body.Ratings[0].Value;
				} else {
					ratingsImdb = 'Not Rated';
				}
				if (body.Ratings[1]) {
					ratingsRotten = body.Ratings[1].Value;
				} else {
					ratingsRotten = 'Not Rated';
				}
				console.log(txt.separator);
				// console.log('body:', body);
				console.log(txt.color.cyan + body.Title + 
					' (' + txt.color.reset + txt.color.cyandim + body.Year + ', ' + body.Country + txt.color.cyan + ')' + 
					txt.color.blue + ' | ' + txt.color.cyan + 'IMDB Rating ['+ txt.color.reset + txt.color.cyandim + ratingsImdb + txt.color.cyan + ']' + 
					txt.color.blue + ' | ' + txt.color.cyan + 'Rotten Tomatoes ['+ txt.color.reset + txt.color.cyandim + ratingsRotten + txt.color.cyan + ']' +
					txt.color.reset);
				console.log(txt.color.white + body.Language + txt.color.reset);
				console.log(txt.separatorplain);
				console.log(txt.color.white + body.Actors + txt.color.reset);
				console.log(txt.separatorplain);
				console.log(txt.color.white + body.Plot + txt.color.reset);
				console.log(txt.separator);
				console.log('Updating session.');
				session.results = body;
				session.save(session);
			}
		  
		});
		

	},
	rando: function(arg){ 
		console.log(txt.loading.do); 
		var doWhat;
		var withThis;
		fs.readFile('./random.txt', 'utf8', function(err,data){
			if (err) throw err;
			console.log(txt.loaded.do); 
			var arr = data.split(',');
			doWhat = arr[0];
			withThis = arr[1].replace(/"/g,'');
			console.log('\n' + txt.color.white + 'Do What: ' + txt.color.reset + txt.color.cyan + doWhat);
			console.log(txt.color.white + 'With This: ' + txt.color.reset + txt.color.cyan + withThis + txt.color.reset + '\n');
			liri.cmd = doWhat;
			liri.input = withThis;
			var doNewLiri = liri.action;
			var newRun = doNewLiri.bind(liri);
			newRun();
		});

	}
};
var doLiri = liri.init;
var run = doLiri.bind(liri);

run();



	