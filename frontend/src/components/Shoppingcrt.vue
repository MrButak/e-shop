// this component works together with and imports Addressform.vue component
<template>

<div class="shoppingCartDisplayWrapper">
    <h2 class="shoppingCartTitle">Shopping Cart</h2>
    <div v-for="item in this.shoppingCart" class="shoppingCartItems" :data-item="item['id']">
        
        <!-- only show cart items with positive quantity -->
        <div v-if="item['buyQuantity'] > 0" class="cartItem"> 
            <p class="cartItemName">{{ item.name }}</p>
            <form action="">
                <div class="qtyAdjustWrapper">
                    <p>order quantity: {{ item.buyQuantity }}</p>
                    
                    <div class="buyQtyBtnWrapper">
                        <button type="button" @click="decreaseItemQty">-</button>
                        <input id="buyQtyTxtInput" :value="item['buyQuantity']" pattern="[0-9]*">
                        <button type="button" @click="increaseItemQty">+</button>
                    </div>
                </div>
            <p>left in stock: {{ item.quantity }}</p>
            <p>total price: ${{ item.price * item.buyQuantity }}</p>
            </form>
        </div>
    </div>
    <div class="subTotal">
        <div class="subTotalText">
            <p>Subtotal: ${{ subTotal }}</p>
        </div>
    </div>
</div>

<button class="addressFormShowBtn">Delivery address</button>
<div class="addressFormWrapper">    
    <Addressform ref="addressForm" />
</div>

<router-link to="/address">Checkout</router-link>
</template>

<script>

// import axios from 'axios';
import { defineComponent } from 'vue';
import { globalState } from '../statestore/composition';
import Addressform from '../components/Addressform';

export default defineComponent({

    setup() {
        const { cartItemCnt, menuItems, shoppingCart } = globalState();

        return { // make it available in <template>
            cartItemCnt,
            menuItems,
            shoppingCart
        }
    },

    components: {

        Addressform
    },
    toggleModal() {

        this.modal.classList.toggle("show-modal");
    },

    data() {

        return{

            subTotal: 0,
        }
    },

    mounted() {
        this.calculateTotalCost();
        // this.initDom();
    },

    methods: {

        initDom() {

            
        },

        calculateTotalCost() {

            // TODO validate ammount, set a .env(?) variable for ammount and validate again
            // right before payment
            // console.log(this.shoppingCart)
            let ShoppingCartObj = this.shoppingCart
            
            // get subtotal
            let subTotal = 0;
            Object.keys(ShoppingCartObj).forEach(function (key){
                subTotal += ShoppingCartObj[key]['price'] * ShoppingCartObj[key]['buyQuantity'];
       
                // console.log(subTotal)
            });
            this.subTotal = subTotal;
            // console.log(subTotal)
         
        },

        decreaseItemQty(event) {

            let keyDataNum = event.path[5].dataset.item;
            let curntShoppingCrtItem = this.shoppingCart[`item-${keyDataNum}`];
            // let curntMenuItem = this.menuItems[`item-${keyDataNum}`];

            if(curntShoppingCrtItem.buyQuantity > 1) {

                // decrease item from shopping cart
                this.shoppingCart[`item-${keyDataNum}`].buyQuantity--;
                // increase item quantity
                this.menuItems[`item-${keyDataNum}`].quantity++;
                this.cartItemCnt--;
                this.calculateTotalCost()
                return;
            }
            else {

                console.log("ok, empty now")
                return
            }
          
        },

        increaseItemQty(event) {

            // console.log
            let keyDataNum = event.path[5].dataset.item;
            let curntShoppingCrtItem = this.shoppingCart[`item-${keyDataNum}`];
            
            let curntMenuItem = this.menuItems[`item-${keyDataNum}`];
            
            // console.log("shopping cart")
            // if(curntShoppingCrtItem.buyQuantity < curntMenuItem.quantity) {
            if(curntMenuItem.quantity > 0) {

                // decrease item quantity
                this.menuItems[`item-${keyDataNum}`].quantity--;

                // increase client buy quantity
                this.shoppingCart[`item-${keyDataNum}`].buyQuantity++;
                
                this.cartItemCnt++;

                this.calculateTotalCost()
                return;
            }
            else {

                console.log("out of stock")
                return
            }

        },

    },

})



</script>

<style scoped>
.shoppingCartTitle {

    text-align: center;
    font-weight: 800;

}
.shoppingCartDisplayWrapper {

   /* display: flex;*/
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
    padding: 10px 0 10px;
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
    align-items: center;
    width: 100%;
    
}
.subTotalText {
    width: 80%;
    padding-top: 10px;
}


</style>
