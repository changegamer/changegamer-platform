// Get access to Parse Server's cache
const { AppCache } = require('parse-server/lib/cache');

/*Parse.Cloud.define('sendWelcomeMail', (request, response) => {
  // Get a reference to the MailgunAdapter
    MailgunAdapter.send({...});
});*/

Parse.Cloud.afterSave(Parse.User, function(request) {

  var emailRecipient = request.object.get("email");
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

Parse.Cloud.afterSave("Invite", function(request) {

  var emailRecipient = request.object.get("email");
  if (emailRecipient) {
    var verificationCode = request.object.get("verificationCode")
    var expirationDate = request.object.get("expirationDate")
    var firstName = request.object.get("firstName")
    const MailgunAdapter = AppCache.get(process.env.APP_ID)['userController']['adapter'];

    MailgunAdapter.send({
      templateName: 'inviteCodeEmail',
      fromAddress: 'The Hive <noreply@change-gamer.com>',
      recipient: emailRecipient,
      variables: { firstName: firstName, code: verificationCode } // {{firstName}} will be compiled to 'firstName'
    });
  }
});
