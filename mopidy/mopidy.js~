module.exports = function(RED) {
    function MopidyInNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
	var Mopidy = require('mopidy');
	this.mopidy = new Mopidy({
	    webSocketUrl: "ws://localhost:6680/mopidy/ws/"
	});
	this.nowPlaying = function(track) {
	    var msg = {};
	    if (track) {
		msg.payload = {track: track.name, artist: track.artists[0].name, album: track.album.name};
	    } else {
		msg.payload = {track: 'none', artist: 'none', album: 'none'};
	    }
	    node.send(msg);
	}
	this.mopidy.on('event:trackPlaybackStarted', function(data){
		node.mopidy.playback.getCurrentTrack()
    		.done(node.nowPlaying);
	});
    }
    RED.nodes.registerType("mopidy in",MopidyInNode);

    function MopidyOutNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
	var Mopidy = require('mopidy');
	this.mopidy = new Mopidy({
	    webSocketUrl: "ws://localhost:6680/mopidy/ws/"
	});
	this.mopidy.on("state:online", function () {
	    node.on('input', function(msg) {
		if (msg.payload == "next") {
		    this.mopidy.playback.next();
		} else if (msg.payload == "play") {
		    this.mopidy.playback.play();
		} else if (msg.payload == "pause") {
		    this.mopidy.playback.pause();
		} else if (msg.payload == "stop") {
		    this.mopidy.playback.stop();
		} else if (msg.payload == "previous") {
		    this.mopidy.playback.previous();
		};
	    });
	});
    }
    RED.nodes.registerType("mopidy out",MopidyOutNode);
}
