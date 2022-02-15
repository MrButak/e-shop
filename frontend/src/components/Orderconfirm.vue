<template>

    <p>{{ paymentMessage }}</p>
 
</template>




<script>
    import { defineComponent } from 'vue'
    import { cartItemCount } from '../statestore/composition'

    export default defineComponent({
        
        data() {

            return {

                paymentMessage: null
            }
           
        },

    

        mounted() {

            
            this.getPaymentMessage()
        },

        methods: {

            getPaymentMessage() {

                let paymentMessage = this.paymentMessage
                const stripe =  Stripe('pk_test_51KSQNbAaTEmIXM6wL3LwNtZaJUdoM4PqzKuLQFjWv24tO3CEiugdMODrtIwK60mLl6UWDE4OCRWpj5a7uYipNTaB008sPbbmch');
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const paymentIntentClientSecret = urlParams.get('payment_intent_client_secret');

            
                stripe
                    .retrievePaymentIntent(paymentIntentClientSecret)

                    .then(function(result) {
                        // Handle result.error or result.paymentIntent
                        console.log(result.paymentIntent)
                        paymentMessage = result.paymentIntent
                    });

                this.paymentMessage = paymentMessage

            }
        }

       


    })

    // When Stripe redirects the customer to the return_url, the payment_intent_client_secret query parameter is appended by Stripe.js. 
    // Use this to retrieve the PaymentIntent to determine what to show to your customer.


    

</script>
