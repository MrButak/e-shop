
<template>

<div class="shoppingCartWrapper">
    <h2 class="shoppingCartTitle">Shopping Cart</h2>
    <div v-for="item in this.shoppingCart" class="shoppingCartItems" :data-item="item['id']">
        
        <!-- only show cart items with positive quantity -->
        <div v-if="item['buyQuantity'] > 0" class="cartItem"> 
            <p class="cartItemName">{{ item.name }}</p>
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
    <div class="subTotal">

        <p>Subtotal: ${{ subTotal }}</p>
        

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

    data() {

        return{
            subTotal: 0
        }
    },


    mounted() {
        this.calculateTotalCost();
   
    },

    methods: {

        calculateTotalCost() {

            // TODO validate ammount, set a env(?) variable for ammount and validate again
            // right before payment
            console.log(this.shoppingCart)
            let ShoppingCartObj = this.shoppingCart
            
            // get subtotal
            let subTotal = 0;
            Object.keys(ShoppingCartObj).forEach(function (key){
                subTotal += ShoppingCartObj[key]['price'] * ShoppingCartObj[key]['buyQuantity'];
       
                console.log(subTotal)
            });
            this.subTotal = subTotal;
            console.log(subTotal)
         
        },

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
.shoppingCartTitle {

    text-align: center;
    font-weight: 800;

}
.shoppingCartWrapper {

    display: flex;
    flex-direction: column;
    gap: 11px;
}

.shoppingCartItems {

    display: flex;
    justify-content: center;
    width: 100%;
}
.cartItem {
    
    width: 80%;
    padding: 10px;
    border-bottom: 1px solid #ccbdae;
}
.cartItemName {
    text-align: left;
    font-weight: 600;
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
.subTotal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-bottom: 1px solid #ccbdae;
    width: 100%;
    padding: 10px;
    margin-left: 10%;
    
}

</style>
