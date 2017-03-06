// Entry point into the node app
console.log('Starting Parse Server...');

const resolve = require('path').resolve;
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

var api = new ParseServer({

  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', //Don't forget to change to https if needed
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId', //Parse App ID
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev', //Connection string for your MongoDB database
  fileKey: 'optionalFileKey',
  // Enable email verification
  //verifyUserEmails: true,
  appName: 'The Hive',
  publicServerURL: process.env.SERVER_URL +'/parse',
  emailAdapter: {
    module: 'parse-server-mailgun',
    options: {
    // The address that your emails come from
      fromAddress: 'The Hive <noreply@change-gamer.com>',
    // Your domain from mailgun.com
      domain: 'change-gamer.com',
    // Your API key from mailgun.com
      apiKey: 'key-61505debe61846676bc2dc54658db3b2',
    // The template section
      templates: {
        passwordResetEmail: {
          subject: 'Reset your password',
          pathPlainText: resolve(__dirname, 'email-templates/password_reset_email.txt'),
          pathHtml: resolve(__dirname, 'email-templates/password_reset_email.html'),
          callback: (user) => { return { firstName: user.get('firstName') }}
        // Now you can use {{firstName}} in your templates
      },
        verificationEmail: {
          subject: 'Confirm your account',
          pathPlainText: resolve(__dirname, 'email-templates/verification_email.txt'),
          pathHtml: resolve(__dirname, 'email-templates/verification_email.html'),
          callback: (user) => { return { firstName: user.get('firstName') }}
          // Now you can use {{firstName}} in your templates
      },
        welcomeEmailAlert: {
          subject: 'Welcome to The Hive!',
          pathPlainText: resolve(__dirname, 'email-templates/welcome_email.txt'),
          pathHtml: resolve(__dirname, 'email-templates/welcome_email.html'),
        },
        inviteCodeEmail: {
          subject: 'You have been invited to The Hive!',
          pathPlainText: resolve(__dirname, 'email-templates/invite_code_email.txt'),
          pathHtml: resolve(__dirname, 'email-templates/invite_code_email.html'),
        }
      }
    }
  }
});

var app = express();

// Serve the Parse API at /parse URL prefix
app.use('/parse', api);

app.get('/', function(req, res) {
  res.status(200).send('Web Request Successful! \n changegamer root entry point');
});

var port = process.env.PORT || 5000;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('changegamer platform running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
