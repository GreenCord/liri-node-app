# LIRI Node App (liri-node-app)

## Installation

*Note: This assumes that you already have Node.js installed locally.*

1. Clone the repo to your local machine. [Git Repo](https://github.com/GreenCord/liri-node-app.git)
1. Run ```npm install``` to get required packages.
1. You will need to provide your own ```.env``` file with Twitter and Spotify API keys.
	```
	# Spotify API keys (replace with your key/secret)
	SPOTIFY_ID=your-spotify-id
	SPOTIFY_SECRET=your-spotify-secret
	# Twitter API keys (replace with your keys/secrets)
	TWITTER_CONSUMER_KEY=your-twitter-consumer-key
	TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
	TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
	TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
	```
1. From the root folder, command LIRI!

## Description

LIRI will perform API searches for various commands, save each request to a session history\*, and allow users to view the history.
\* Not all commands are stored. Fatal API errors and the history search itself are not recorded in the history.


## LIRI Commands

LIRI knows a small number of commands:

* my-tweets
* spotify-this-song
* movie-this
* do-what-it-says
* history

### my-tweets

**Command:** ```my-tweets```

**Example:** ```node liri.js my-tweets```

**Description:** LIRI will retrieve and display up to 10 recent Tweets made by [@hidden_ocean_18](https://twitter.com/hidden_ocean_18).

### spotify-this-song

**Command:** ```spotify-this-song [song name (optional)]```

**Example:** ```node liri.js spotify-this-song Mmm bop```

**Description:** LIRI will retrieve and display information from Spotify about the song name provided. If no song name is provided, you will get info about "The Sign" by Ace of Base.

### movie-this

**Command:** ```movie-this [movie title (optional)]```

*Examples:* ```node liri.js movie-this Dante\'s Peak```, ```node liri.js movie-this Die Hard```

**Description:** LIRI will retrieve and display information from OMDB about the movie title provided. If no movie title is provided, you will get info about the movie "Mr. Nobody".

### do-what-it-says

**Command:** ```do-what-it-says```

**Example:** ```node liri.js do-what-it-says```

**Description:** LIRI will retrieve instructions from random.txt in the root folder, parse the instructions within, and perform the command.

### history

**Command:** ```history [verbose (optional)]```

**Example:** ```node liri.js history```, ```node liri.js history verbose```

**Description:** Using log.txt, LIRI will display a history of commands performed. With the ```verbose``` modifier, the history will display the JSON object of the results of the historic search.
