// Get access to Parse Server's cache
const { AppCache } = require('parse-server/lib/cache');

/*Parse.Cloud.define('sendWelcomeMail', (request, response) => {
  // Get a reference to the MailgunAdapter
    MailgunAdapter.send({...});
});*/

Parse.Cloud.afterSave(Parse.User, function(request) {

  console.log('request payload: ' + request);
  //var user = request.user;
  const MailgunAdapter = AppCache.get(process.env.APP_ID)['userController']['adapter'];

  MailgunAdapter.send({
    templateName: 'customEmailAlert',
    // Optional override of your configuration's subject
    subject: 'Welcome to The Hive!',
    // Optional override of the adapter's fromAddress
    fromAddress: 'The Hive <noreply@change-gamer.com>',
    recipient: 'kepulak@gmail.com'
  });
});
