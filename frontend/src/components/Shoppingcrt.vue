
<template>

    <p>Shopping Cart</p>

    <div v-for="item in this.shoppingCart" id="shoppingCartItems" :data-item="item['id']">
        
        <p>{{ item.name }}</p>
        <p>quantity: {{ item.buyQuantity }}</p>
        <p>total price :{{ item.price * item.buyQuantity }}</p>

        <form action="">
            <div class="buyQtyBtnWrapper">
                <button type="button" @click="decreaseItemQty">-</button>
                <input id="buyQtyTxtInput" name="qtyInput" value="1" min="1" pattern="[0-9]*">
                <button type="button" @click="increaseItemQty">+</button>
            </div>
        </form>

    </div> 
    
    <router-link to="/address">Checkout</router-link>
</template>

<script>

// import axios from 'axios';
import { defineComponent } from 'vue';
import { globalState } from '../statestore/composition';

export default defineComponent({

    setup() {
        const { cartItemCnt, menuItems, shoppingCart } = globalState();

        return { // make it available in <template>
            cartItemCnt,
            menuItems,
            shoppingCart
        }
    },


    mounted() {
        
   
    },

    methods: {

       decreaseItemQty(event) {

           console.log(this.shoppingCart)
           console.log(event)
       }
    },

})



</script>

<style scoped>
#shoppingCartItems {

    border: 1px solid black;
}
.buyQtyBtnWrapper {

display: flex;
flex-direction: row;
justify-content: center;

}
#buyQtyTxtInput {
    text-align: center;
    width: 35px;
}

</style>
