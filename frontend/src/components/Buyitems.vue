<template>
    <p>Checkout</p>
    <div v-for="item in this.shoppingCart">
        <div id="shoppingCartItems">
            <p>{{ item.name }}</p>
            <p>quantity: {{ item.buyQuantity }}</p>
            <p>total price :{{ item.price * item.buyQuantity }}</p>
        </div>
    </div>

    <div>
    <form>
        <input type="text" name="name" placeholder="Name">
        <input type="email" name="email" placeholder="Email">
        <input type="text" name="amount" placeholder="Amount">

        <div id="card-element"></div>
        <div id="card-errors" role="alert"></div>
        <button @click="submitPayment">Submit Payment</button>
    </form>
    </div>
    
    
    
</template>

<script>

import axios from 'axios';
import { defineComponent } from 'vue'
import { cartItemCount } from '../statestore/composition'

export default defineComponent({

    setup() {
        const { cartItemCnt, menuItems, shoppingCart } = cartItemCount();

        return { // make it available in <template>
            cartItemCnt,
            menuItems,
            shoppingCart
        }
    },

    
    mounted() {
        
   
    },

    methods: {

        card() {
            // const stripe = Stripe('PUBLISHABLE_KEY'); // Your Publishable Key
            // const elements = stripe.elements();

            // Create our card inputs
            //  

            // Give our token to our form
            // const stripeTokenHandler = token => {
            // const hiddenInput = document.createElement('input');
            // hiddenInput.setAttribute('type', 'hidden');
            // hiddenInput.setAttribute('name', 'stripeToken');
            // hiddenInput.setAttribute('value', token.id);
            // form.appendChild(hiddenInput);

            // form.submit();
            // }

            // Create token from card data
            // form.addEventListener('submit', e => {
            // e.preventDefault();

            // stripe.createToken(card).then(res => {
            //     if (res.error) errorEl.textContent = res.error.message;
            //     else stripeTokenHandler(res.token);
            // })
            // })
    
        },


        async submitPayment() {

            let response = await axios({
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: 'http://127.0.0.1:3000/checkout',
                data: null
            })
            
            .then((response) => {
                
                console.log(response.data)
                console.log("I'm in the response to the pay post request")
            });
            
            return;
            
        }
    },

})



</script>

<style>
    #shoppingCartItems {

        border: 1px solid black;
    }
</style>
