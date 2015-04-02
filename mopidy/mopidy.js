module.exports = function(RED) {
    function MopidyNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
	var Mopidy = require('mopidy');
	var mopidy = new Mopidy({
	    webSocketUrl: "ws://localhost:6680/mopidy/ws/"
	});
	mopidy.on('event:trackPlaybackStarted', function(data){
		var msg = {};
		msg.payload = data.tl_track;
		node.send(msg);
	});
    }
    RED.nodes.registerType("mopidy",MopidyNode);
}
