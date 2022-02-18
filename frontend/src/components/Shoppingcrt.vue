
<template>

    <p>Shopping Cart</p>

    <div v-for="item in this.shoppingCart" class="shoppingCartItems" :data-item="item['id']">
        
        <!-- only show cart items with positive quantity -->
        <div v-if="item['buyQuantity'] > 0" class="cartItem"> 
            <p>{{ item.name }}</p>
            <form action="">
      
                <div class="qtyAdjustWrapper">
                    <p>quantity: {{ item.buyQuantity }}</p>
                    <div class="buyQtyBtnWrapper">
                        <button type="button" @click="decreaseItemQty">-</button>
                        <input id="buyQtyTxtInput" :value="item['buyQuantity']" pattern="[0-9]*">
                        <button type="button" @click="increaseItemQty">+</button>
                    </div>
                </div>
            <p>total price :{{ item.price * item.buyQuantity }}</p>
            </form>

        </div>
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

            // current item in shopping cart
            let shoppingCrtObj = this.shoppingCart[`item-${event.path[4].dataset.item}`];
            let shoppingCrtDataNum = event.path[4].dataset.item;
            
            if(shoppingCrtObj.buyQuantity > 1) {

                console.log(shoppingCrtObj.buyQuantity)
                
                this.shoppingCart[`item-${shoppingCrtDataNum}`].buyQuantity--;
                this.cartItemCnt--;
                return;
            }
            else {

                console.log("ok, empty now")
                return
            }
            
            // else if(this.shoppingCart[`item-${event.path[3].dataset.item}`].quantity < 2) {

            //     this.shoppingCart[`item-${event.path[2].dataset.item}`] = this.menuItems[`item-${event.path[2].dataset.item}`];
            //     this.shoppingCart[`item-${event.path[2].dataset.item}`].buyQuantity = 1;
            // };
        }
    },

})



</script>

<style scoped>
.shoppingCartItems {

    display: flex;
    justify-content: center;
    width: 100%;
}
.cartItem {

    width: 80%;
    padding: 10px;
    border: 1px solid black;
}
.buyQtyBtnWrapper {

    display: flex;

}
.qtyAdjustWrapper {
    display: flex;
    align-items: center;
    gap: 10%;
}
#buyQtyTxtInput {
    text-align: center;
    width: 35px;
}

</style>
