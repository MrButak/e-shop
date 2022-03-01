<template>

    <p>Payment: {{ stripePaymentMessage.status }}</p>
    <p>Receipt email: {{ this.receiptEmail }}</p>

    <p> Items Ordered:</p>
    <div v-for="item in this.itemsPurchased">
        <p>{{ item.name }} x {{ item.qty }}</p>
        <p>price per item: {{ item.price }}</p>
    </div>
    <p>Total ammount: ${{ this.totalPrice }}</p>
    <p> Delivery address:</p>
    <p>{{ this.shippingAddress.line1 }} {{ this.shippingAddress.line2 }}</p>
    <p>{{ this.shippingAddress.city }} {{ this.shippingAddress.state }} {{ this.shippingAddress.postal_code }}</p>
    
    
</template>

<script>
// clear ls here
const axios = require('axios');
import { defineComponent } from 'vue';
import { globalState } from '../statestore/composition';

export default defineComponent({
    
    setup() {

        const { lsInUse, customerDetails, cartItemCnt, menuItems, shoppingCart, subTotal } = globalState();

        return { // make it available in <template>
            cartItemCnt,
            menuItems,
            shoppingCart,
            subTotal,
            customerDetails,
            lsInUse
        }
    },

    data() {

        return {

            stripePaymentMessage: {},
            itemsPurchased: {},
            shippingAddress: {},
            receiptEmail: "",
            totalPrice: 0
        }
        
    },

    mounted() {

        this.getPaymentMessage();
        this.clearLocalStorage();
        // this.updateDatabaseMenuItems();
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

                    
                    console.log(result)
                    // this.paymentMessage.amount = result.paymentIntent.amount / 100;
                    this.stripePaymentMessage.status = result.paymentIntent.status;
                    // this.paymentMessage.receipt_email = result.paymentIntent.receipt_email;

                    // make a db call and get more order details
                    this.getOrderInfo(result.paymentIntent.receipt_email, result.paymentIntent.id)
                });
        },

        // Function retrieves purchase from database
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

                    this.itemsPurchased = JSON.parse(response.data[0].items_purchased);
                    this.shippingAddress = JSON.parse(response.data[0].shipping_address);
                    this.receiptEmail = response.data[0].email;
                    this.totalPrice = response.data[0].total_price;
                    

                }
                // TODO: display error message(order not found)
                else {
                    console.log("order not in database");
                    return;
                };
                
            });
        },
        // Function completely clears local storage
        clearLocalStorage() {
            
            // local storage
            if(this.lsInUse) {
                localStorage.clear()
            };
            this.shoppingCart = {};
            this.cartItemCnt = 0;
            this.menuItems = 0; // initially set to 0. If set to 0 a db call is made on '/' (Menuitems.vue) to get all menu items from db and set global state variable this.menuItems and localStorage.menuItems
        },
        // async updateDatabaseMenuItems() {

        //     let response = await axios({
                
        //         method: 'post',
        //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //         url: 'http://127.0.0.1:3000/getmenu',
        //         data: null
        //     })
        // }
    }


})

</script>
