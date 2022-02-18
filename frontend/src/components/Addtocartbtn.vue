<template>

<form action="">
    <div class="buyQtyBtnWrapper">
        <button type="button" @click="increaseItemQty">+</button>    
        <input id="buyQtyTxtInput" name="qtyInput" :value="currentItemView['buyQtyInput']" min="1" pattern="[0-9]*">
        <button type="button" @click="decreaseItemQty">-</button>
    </div>
</form>
    <button>Add to cart</button>


</template>
<script>

import { defineComponent } from 'vue';
import { globalState } from '../statestore/composition';

export default defineComponent({

    name: "Addtocartbtn",
    setup() {
        const { cartItemCnt, menuItems, shoppingCart, currentItemView } = globalState();

        return { // make it available in <template>
            cartItemCnt,
            menuItems,
            shoppingCart,
            currentItemView
        }
    },
    
    data() {

        return {

            
            
    
        }
    },

    // call database to set global menu item and display
    // set variables for the view item popup modal
    mounted() {
        
      
    },

    methods: {

      
        increaseItemQty() {

            // make sure number can't increase past item quantity in stock
            if(this.currentItemView['buyQtyInput'] >= this.currentItemView['quantity']) {

                return;
            };

            this.currentItemView['buyQtyInput']++;
        },

        decreaseItemQty() {

            // make sure number can't go below 1
            if(this.currentItemView['buyQtyInput'] < 2) {
                return;
            };
            
            this.currentItemView['buyQtyInput']--;
        }
        
    },
})



</script>

<style scoped>


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
