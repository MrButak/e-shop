require('dotenv').config()
const email_sk = process.env.EMAIL_SK;

exports.sendPaymentSuccessEmail = (paymentIntent) => {

    let customerName = paymentIntent.shipping.name;
    let streetAddress = paymentIntent.shipping.address.line1;
    let streetAddress2 = paymentIntent.shipping.address.line2;
    let city = paymentIntent.shipping.address.city;
    let state = paymentIntent.shipping.address.state;
    let postalCode = paymentIntent.shipping.address.postal_code;
    let country = paymentIntent.shipping.address.country;
    // TODO: would like to have items ordered in the metadata object when creating payment intent controllers/payment.js
    let paymentAmount = paymentIntent.amount;
    let paymentStatus = paymentIntent.status;
    let email = paymentIntent.receipt_email;
    
    console.log(customerName, streetAddress, streetAddress2, city, state, postalCode, country, paymentAmount, email)
    console.log("all this here ^^^^^^^^^^^^^^^^^^^^6")
   
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
            email: email,
            name: customerName
        }],
        templateId: 15,
        params: {

            testy: "hey hey hey"
            
            // customerName: customerName,
            // streetAddress: streetAddress,
            // streetAddress2: streetAddress2,
            // city: city,
            // state: state,
            // postalCode: postalCode,
            // country: country,
            // paymentAmount: paymentAmount
        },
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
