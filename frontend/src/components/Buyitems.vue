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
        <button @click="createPaymentIntent">Submit Payment</button>
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

        

        async createPaymentIntent() {

            let response = await axios({
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: 'http://127.0.0.1:3000/create-payment-intent',
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
