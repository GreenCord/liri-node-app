var twitterKeys = require ('./keys.js');




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
		console.log(this.input);
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
	tweets: function(arg){ console.log('Run "my-tweets"...'); },
	spotify: function(arg){ console.log('Run "spotify-this-song"...', arg); },
	movie: function(arg){ console.log('Run "movie-this"...', arg); },
	rando: function(arg){ console.log('Run "do-what-it-says"...'); }
};
var doLiri = liri.init;
var run = doLiri.bind(liri);

run();



	