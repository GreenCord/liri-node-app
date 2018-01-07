require("dotenv").config();
var keys = require ('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');


var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

var txt = {
	loading: {
		tweets: ',.-~*` --==[[[ LOADING TWEETS ]]]==-- `*~-.,',
		spotify: ',.-~*` --==[[[ SEARCHING SPOTIFY ]]]==-- `*~-.,'
	},
	loaded: {
		tweets: '`*~-., --==[[[ TWEETS LOADED  ]]]==-- ,.-~*`',
		spotify: '`*~-., --==[[[ SPOTIFY SEARCHED  ]]]==-- ,.-~*`'
	},
	separator: '~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~'
};

var liri = {
	cmd: process.argv[2],
	input: '',
	init: function() {
		for (var i = 3; i < process.argv.length; i++) {
			if (i < process.argv.length) 
			{ this.input += process.argv[i] + ' '; }
			else
			{ this.input += process.argv[i]; }
		}
		this.action();
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

			default:
				console.log('Default case.');
		} // end switch
	}, // end action
	tweets: function(){ 
		console.log(txt.loading.tweets); 
		var params = {screen_name: 'hidden_ocean_18'};
		twitter.get('statuses/user_timeline', params, function(error, tweets, response){
			if (!error) {
				console.log(txt.loaded.tweets);
				console.log(txt.separator);
				for (var i = 0; i < tweets.length; i++) {
					console.log(tweets[i].created_at + '\n' + tweets[i].text);
					console.log(txt.separator);
				}
			}
		});

	},
	spotify: function(arg){ 
		console.log(txt.loading.spotify);
		arg = arg.trim();
		if ((!arg) || (arg == undefined)) {
			arg = 'The Sign';
		}
		spotify.search({ type: 'track', query: arg, limit: 8 }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  } else {
		  	console.log(txt.loaded.spotify + '\n' + txt.separator);
		  	var spotted = data.tracks.items;
		  	if (spotted.length === 0) {
		  		console.log('No tracks for ' + arg + ' found. Sorry.');
		  		console.log(txt.separator);
		  	} else {
			  	for (var i = 0; i < spotted.length; i++) {
			  		// console.log(spotted[i]);
				  	console.log('Album:       ' + spotted[i].album.name);
				  	console.log('Song Name:   ' + spotted[i].name);
				  	for (var j = 0; j < spotted[i].album.artists.length; j++) {
				  		console.log('Artist:      ' + spotted[i].album.artists[j].name);
				  	}
				  	console.log('Preview URL: ' + spotted[i].preview_url);
				  	console.log(txt.separator);
			  	}
			  }
		  }
		});
	},
	movie: function(arg){ console.log('Run "movie-this"...', arg); },
	rando: function(arg){ console.log('Run "do-what-it-says"...'); }
};
var doLiri = liri.init;
var run = doLiri.bind(liri);

run();



	