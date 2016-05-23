var express = require('express');
var app = express();

// render javascript css files
app.use(express.static(__dirname + '/public'));

app.get('*',function(req,res){
	res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(3000,function(){
	console.log("listening to port 3000...");
});