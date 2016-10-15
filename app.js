// Entry point into the node app
console.log('Starting Parse Server...');

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

var api = new ParseServer({

  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', //Don't forget to change to https if needed
  appId: process.env.APP_ID || 'myAppId', //Parse App ID
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev', //Connection string for your MongoDB database
  fileKey: 'optionalFileKey'
});

var app = express();

// Serve the Parse API at /parse URL prefix
app.use('/parse', api);

app.get('/', function(req, res) {
  res.status(200).send('Web Request Successful!');
});

var port = 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('changegamer platform running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
