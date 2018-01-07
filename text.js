var txt = {
	color: {
		blue: '\x1b[1m\x1b[34m',
		cyan: '\x1b[1m\x1b[36m',
		cyandim: '\x1b[2m\x1b[36m',
		green: '\x1b[1m\x1b[32m',
		red: '\x1b[1m\x1b[31m',
		reset: '\x1b[0m',
		yellow: '\x1b[1m\x1b[33m',
		white: '\x1b[1m\x1b[37m',
		whitedim: '\x1b[2m\x1b[37m'
	},
	loading: {
		tweets: ',.-~*` --==[[[\x1b[1m\x1b[33m LOADING TWEETS \x1b[0m]]]==-- `*~-.,',
		spotify: ',.-~*` --==[[[\x1b[1m\x1b[33m SEARCHING SPOTIFY \x1b[0m]]]==-- `*~-.,',
		movie: ',.-~*` --==[[[\x1b[1m\x1b[33m SEARCHING OMDB \x1b[0m]]]==-- `*~-.,',
		do: ',.-~*` --==[[[\x1b[1m\x1b[33m DOING WHAT IT SAYS \x1b[0m]]]==-- `*~-.,'
	},
	loaded: {
		tweets: '`*~-., --==[[[\x1b[1m\x1b[32m TWEETS LOADED  \x1b[0m]]]==-- ,.-~*`',
		spotify: '`*~-., --==[[[\x1b[1m\x1b[32m SPOTIFY SEARCHED  \x1b[0m]]]==-- ,.-~*`',
		movie: '`*~-., --==[[[\x1b[1m\x1b[32m OMDB SEARCHED  \x1b[0m]]]==-- ,.-~*`',
		do: '`*~-., --==[[[\x1b[1m\x1b[32m  DOING THE THING   \x1b[0m]]]==-- ,.-~*`'
	},
	separator: '~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~',
	separatorplain: '-------------------------------------------------------------'
};

module.exports = txt;