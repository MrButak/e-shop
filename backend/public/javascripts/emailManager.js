require('dotenv').config()
const email_sk = process.env.EMAIL_SK;

exports.sendPaymentSuccessEmail = (paymentIntent) => {

    let purchasedItems = paymentIntent.metadata.purchasedItems
    purchasedItems = JSON.parse(purchasedItems)
    console.log(purchasedItems)
    console.log("email sending here ^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    // create array of items ordered I can pass to email api
    // let shoppingCart = []
    // let itemKeys = Object.keys(paymentIntent.metadata)
    // itemKeys.forEach((item) => {

    //     shoppingCart.push(paymentIntent.metadata[item])
    // })


    

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
            email: paymentIntent.receipt_email,
            name: paymentIntent.shipping.name
        }],
        templateId: 19,
        params: {
            
            customerName: paymentIntent.shipping.name,
            streetAddress: paymentIntent.shipping.address.line1,
            streetAddress2: paymentIntent.shipping.address.line2,
            city: paymentIntent.shipping.address.city,
            state: paymentIntent.shipping.address.state,
            postalCode: paymentIntent.shipping.address.postal_code,
            country: paymentIntent.shipping.address.country,
            paymentAmount: paymentIntent.amount / 100, // amount in cents,
            // shoppingcart: shoppingCart,
            purchasedItems: purchasedItems
        },
        
        headers: {
            'X-Mailin-custom': 'api-key: email_sk|content-type: application/json|accept: application/json'
        }
    };
    
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        console.log('email API called successfully.');
        console.log(data);
        
    }, function(error) {
        console.error(error);
    });


}
