require('dotenv').config()
const email_sk = process.env.EMAIL_SK;

exports.sendPaymentSuccessEmail = () => {

    var SibApiV3Sdk = require('sib-api-v3-sdk');
    var defaultClient = SibApiV3Sdk.ApiClient.instance;
    
    // Configure API key authorization: api-key
    var apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = email_sk;
    
    // Uncomment below two lines to configure authorization using: partner-key
    // var partnerKey = defaultClient.authentications['partner-key'];
    // partnerKey.apiKey = 'YOUR API KEY';
    
    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    
    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
    
    sendSmtpEmail = {
        to: [{
            email: 'mspence5555@gmail.com',
            name: 'Matt'
        }],
        templateId: 15,
        // params: {
        //     name: 'John',
        //     surname: 'Doe'
        // },
        headers: {
            'X-Mailin-custom': 'api-key: email_sk|content-type: application/json|accept: application/json'
        }
    };
    
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log('API called successfully. Returned data: ' + data);
    }, function(error) {
      console.error(error);
    });


}
