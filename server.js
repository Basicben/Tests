var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/',express.static('./public')).listen(process.env.PORT || 3000);

console.log('listenning on server...');

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/getLog',function(req,res){
	var filename = 'log.txt';
	fs.readFile(filename, 'utf8', function(err, data) {
	  if (err) throw err;
	  console.log('OK: ' + filename);
	  console.log(data);
	  res.json(data);
	});
});

app.post('/writeLog',function(req,res){
	// Add todays date and time.
	// add to json string.
	var filename = 'log.txt';
	fs.open(filename, 'a', 666, function( e, id ) {
	  fs.write( id, req.body.data , null, 'utf8', function(){
	    fs.close(id, function(){
	      console.log('file closed');
	    });
	  });
	});
	
});