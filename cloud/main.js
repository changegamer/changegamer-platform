// Get access to Parse Server's cache
const { AppCache } = require('parse-server/lib/cache');

/*Parse.Cloud.define('sendWelcomeMail', (request, response) => {
  // Get a reference to the MailgunAdapter
    const MailgunAdapter = AppCache.get('appId')['userController']['adapter'];
    MailgunAdapter.send({...});
});*/

Parse.Cloud.afterSave(Parse.User, function(request) {

  var user = request.user;

  MailgunAdapter.send({
    templateName: 'customEmailAlert',
    // Optional override of your configuration's subject
    subject: 'Welcome to The Hive!',
    // Optional override of the adapter's fromAddress
    fromAddress: 'The Hive <noreply@change-gamer.com>',
    recipient: user.email
  });
});
