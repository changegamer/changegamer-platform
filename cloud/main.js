// Get access to Parse Server's cache
const { AppCache } = require('parse-server/lib/cache');

/*Parse.Cloud.define('sendWelcomeMail', (request, response) => {
  // Get a reference to the MailgunAdapter
    MailgunAdapter.send({...});
});*/

Parse.Cloud.afterSave(Parse.User, function(request) {

  var emailRecipient = request.object.get("email");
  console.log('request payload user: ' + request.user);
  //var user = request.user;
  const MailgunAdapter = AppCache.get(process.env.APP_ID)['userController']['adapter'];

  MailgunAdapter.send({
    templateName: 'welcomeEmailAlert',
    // Optional override of your configuration's subject
    subject: 'Welcome to The Hive!',
    // Optional override of the adapter's fromAddress
    fromAddress: 'The Hive <noreply@change-gamer.com>',
    recipient: emailRecipient,
    variables: { username: emailRecipient } // {{alert}} will be compiled to 'New posts'
  });
});
