<template>

    <p>Everything look good?</p>

    <div v-for="info in this.customerDetails.user">
        <div>
            <p>{{ info }}</p>
            
        </div>
    </div>
    
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
import { globalState } from '../statestore/composition';

export default defineComponent({

    name: 'Usrvalidation',

    setup() {
        const { cartItemCnt, shoppingCart, customerDetails } = globalState();

        return { // make it available in <template>
            
            cartItemCnt,
            shoppingCart,
            customerDetails
        }
    },

    
    mounted() {
        
        this.testy()
   
    },

    methods: {

       testy() {

           console.log(this.customerDetails.user.add1Field)
       }
    },

})



</script>

<style>

</style>