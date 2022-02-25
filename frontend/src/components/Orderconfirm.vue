<template>

    <p>payment: {{ paymentMessage.status }}</p>
    <p>ammount: {{ paymentMessage.amount }}</p>
    <p>receipt email: {{ paymentMessage.receipt_email }}</p>
    
</template>

<script>
// clear ls here
const axios = require('axios');
import { defineComponent } from 'vue';
import { globalState } from '../statestore/composition';

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

            stripe.retrievePaymentIntent(paymentIntentClientSecret)

                .then((result) => {

                    
                    
                    // this.paymentMessage.amount = result.paymentIntent.amount / 100;
                    // this.paymentMessage.status = result.paymentIntent.status;
                    // this.paymentMessage.receipt_email = result.paymentIntent.receipt_email;

                    // make a db call and get more order details
                    this.getOrderInfo(result.paymentIntent.receipt_email, result.paymentIntent.id)
                });
        },

        async getOrderInfo(email, stripePiId) {
            
            let response = await axios({
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: 'http://127.0.0.1:3000/orderdetails',
                data: {
                    stripePiId: stripePiId,
                    email: email,
                    
                }
                 
            })
            
            .then((response) => {
                
                // if valid address
                if(response.data) {

                    console.log(response.data)
                    console.log("the is the purchase data back on the frontend")
                    response.data.items_purchased
                    response.data.shipping_address
                    // this.$router.push('Uservalidation');
                }
                // TODO: display error message(order not found)
                else {
                    console.log("order not in database");
                    return;
                };
                
            });
        }
    }


})

</script>
