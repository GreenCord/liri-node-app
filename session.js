var fs = require('fs');
var txt = require('./text.js');

var Session = function(cmd,input,results){
	this.cmd = cmd;
	this.input = input;
	this.results = results;
	// console.log('Session Created: ', this.cmd, this.input, this.results);
};

Session.prototype.save = function(toSave){
	// console.log('Saving log file: ', this.cmd, this.input/*, this.results*/);

	fs.open('log.txt', 'ax', (err, fd) => {
		if (err) {
			if (err.code === 'EEXIST') {
				console.log('Saving session...');
				fs.appendFile('log.txt', '~~~'+JSON.stringify(toSave), function(err){
					if (err) {
						console.log('Error saving session: ' + err);
					} else {
						console.log('...session saved!');
					}
				});
			} else {
				console.log('Session log.txt does not exist.');
				throw err;
			}
		} else {
			fs.writeFile('log.txt', JSON.stringify(toSave), function(err){
				console.log('Creating log.txt, saving session...');
				if (err) throw err;
			});
		}
	});
};


Session.prototype.print = function(){
	console.log('This Session: \n', JSON.stringify(session,2,2));
};

Session.prototype.history = function(input){
	fs.readFile('log.txt', 'utf8', (err,fd) => {
		if (err) {
			if (err.code === 'ENOENT') {
				return console.log('There is no history yet. Please use me first!');
			} else throw err;
		}
		var historyArr = fd.split('~~~');
		console.log(txt.separatorplain);
		for (var i = 0; i < historyArr.length; i++) {
			var item = JSON.parse(historyArr[i]);
			if (input==='verbose') {
				console.log('Command: ' + item.cmd + '\nInput: ' + item.input + '\n' + JSON.stringify(item.results,null,2));
			} else {
				console.log('Command: ' + item.cmd + '\nInput: ' + item.input + '\n[Results Object, use "history verbose" to view]');
			}
			console.log(txt.separatorplain);
				
		}
	});
};

module.exports = Session;