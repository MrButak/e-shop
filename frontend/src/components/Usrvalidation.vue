<template>

    <p>Everything look good?</p>
    <div v-for="item in this.shoppingCart">
        <div id="shoppingCartItems">
            <p>{{ item.name }}</p>
            <p>quantity: {{ item.buyQuantity }}</p>
            <p>total price :{{ item.price * item.buyQuantity }}</p>
        </div>
    </div> 
    
    <router-link to="/checkout">Pay</router-link>
</template>

<script>


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

</style>