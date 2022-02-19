<template>

    <p>{{ paymentMessage }}</p>
    <p>test</p>
</template>




<script>
    import { defineComponent } from 'vue'
    import { globalState } from '../statestore/composition'

    export default defineComponent({
        
        data() {

            return {

                paymentMessage: {}
            }
           
        },

    

        mounted() {

            
            this.getPaymentMessage()
        },

        methods: {

            getPaymentMessage() {

                const stripe =  Stripe('pk_test_51KSQNbAaTEmIXM6wL3LwNtZaJUdoM4PqzKuLQFjWv24tO3CEiugdMODrtIwK60mLl6UWDE4OCRWpj5a7uYipNTaB008sPbbmch');
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const paymentIntentClientSecret = urlParams.get('payment_intent_client_secret');

            
                stripe
                    .retrievePaymentIntent(paymentIntentClientSecret)

                    .then((result) => {

                        // this.paymentMessage.receiptEmail = result.
                        // this.paymentMessage = result.paymentIntent;
                        // Handle result.error or result.paymentIntent
                        // console.log(result.paymentIntent)
                        // 
                        // "receipt_email": "mspence5555@gmail.com",
                        //     "setup_future_usage": null,
                        //     "shipping": null,
                        //     "source": null,
                        //     "status": "succeeded"
                        
                        // returned payment object

                        //                         {
                        //     "id": "pi_3KV0PrAaTEmIXM6w3zDTp9s2",
                        //     "object": "payment_intent",
                        //     "amount": 5800,
                        //     "automatic_payment_methods": {
                        //         "enabled": true
                        //     },
                        //     "canceled_at": null,
                        //     "cancellation_reason": null,
                        //     "capture_method": "automatic",
                        //     "client_secret": "pi_3KV0PrAaTEmIXM6w3zDTp9s2_secret_2SQYEywFRbsonnqnyIbDtmDvi",
                        //     "confirmation_method": "automatic",
                        //     "created": 1645305871,
                        //     "currency": "usd",
                        //     "description": "Smoothie order",
                        //     "last_payment_error": null,
                        //     "livemode": false,
                        //     "next_action": null,
                        //     "payment_method": "pm_1KV0QOAaTEmIXM6wHkB5jnjO",
                        //     "payment_method_types": [
                        //         "card"
                        //     ],
                        //     "processing": null,
                        //     "receipt_email": "mspence5555@gmail.com",
                        //     "setup_future_usage": null,
                        //     "shipping": null,
                        //     "source": null,
                        //     "status": "succeeded"
                        // }
                    });

                // this.paymentMessage = paymentMessage

            }
        }

       


    })

    // When Stripe redirects the customer to the return_url, the payment_intent_client_secret query parameter is appended by Stripe.js. 
    // Use this to retrieve the PaymentIntent to determine what to show to your customer.


    

</script>
