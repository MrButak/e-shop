
<template>

    <p>Shopping Cart</p>
    <div v-for="item in this.shoppingCart">
        <div id="shoppingCartItems">
            <p>{{ item.name }}</p>
            <p>quantity: {{ item.buyQuantity }}</p>
            <p>total price :{{ item.price * item.buyQuantity }}</p>
        </div>
    </div> 
    
    <router-link to="/checkout">Checkout</router-link>
</template>

<script>

// import axios from 'axios';
import { defineComponent } from 'vue';
import { cartItemCount } from '../statestore/composition';
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

       
    },

})



</script>

<style>
    #shoppingCartItems {

        border: 1px solid black;
    }
</style>
