var visualizer;

exports.bind = function(vis){
	visualizer = vis;
}

exports.play = function(){
	visualizer.play();
}

exports.pause = function(){
	visualizer.pause();
}

exports.changeSong = function(dir){
	visualizer.changeSong(dir);
}
