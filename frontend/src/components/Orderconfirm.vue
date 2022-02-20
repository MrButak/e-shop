// TODO:
// 1. store shipping address, name, and items ordered in metadata obj during my payment intent request to stripe
// retrieve that information and display it here.

<template>

    <p>payment: {{ paymentMessage.status }}</p>
    <p>ammount: {{ paymentMessage.amount }}</p>
    <p>receipt email: {{ paymentMessage.receipt_email }}</p>
    
</template>




<script>
import { defineComponent } from 'vue'
import { globalState } from '../statestore/composition'

export default defineComponent({
    
    setup() {

        const { customerDetails, cartItemCnt, menuItems, shoppingCart, subTotal } = globalState();

        return { // make it available in <template>
            cartItemCnt,
            menuItems,
            shoppingCart,
            subTotal,
            customerDetails
        }
    },

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

            // When Stripe redirects the customer to the return_url, the payment_intent_client_secret query parameter is appended by Stripe.js. 
            // Use this to retrieve the PaymentIntent to determine what to show to your customer.
            const stripe =  Stripe('pk_test_51KSQNbAaTEmIXM6wL3LwNtZaJUdoM4PqzKuLQFjWv24tO3CEiugdMODrtIwK60mLl6UWDE4OCRWpj5a7uYipNTaB008sPbbmch');
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const paymentIntentClientSecret = urlParams.get('payment_intent_client_secret');

            stripe
                .retrievePaymentIntent(paymentIntentClientSecret)

                .then((result) => {

                    console.log(result)
                    console.log(this.customerDetails)
                    this.paymentMessage.amount = result.paymentIntent.amount;
                    this.paymentMessage.status = result.paymentIntent.status;
                    this.paymentMessage.receipt_email = result.paymentIntent.receipt_email;
                    
                });

            
        }
    }


})


</script>
