// this component works together with and imports Addressform.vue component
<template>

<div v-for="item in this.shoppingCart" class="shoppingCartItems" :data-item="item['item_id']">
    
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

<div class="subTotalWrapper">
    <div class="subTotalText">
        <p>Subtotal: ${{ subTotal }}</p>
    </div>
</div>


</template>

<script>

// import axios from 'axios';
import { defineComponent } from 'vue';
import { globalState } from '../statestore/composition';

export default defineComponent({

    setup() {
        const { lsInUse, cartItemCnt, menuItems, shoppingCart, subTotal } = globalState();

        return { // make it available in <template>
            cartItemCnt,
            menuItems,
            shoppingCart,
            subTotal,
            lsInUse
        }
    },

    components: {

    },
    
    data() {

        return{

            
        }
    },

    mounted() {
       // this.loadLs();
        this.calculateTotalCost();
    },

    methods: {

        calculateTotalCost() {

            // TODO validate ammount, set a .env(?) variable for ammount and validate again
            // right before payment
            
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

            // using click event path to find item id. Item id is a data-item attribute on the html element
            let keyDataNum = event.path[5].dataset.item;
            let curntShoppingCrtItem = this.shoppingCart[`item-${keyDataNum}`];
            // let curntMenuItem = this.menuItems[`item-${keyDataNum}`];

            if(curntShoppingCrtItem.buyQuantity > 1) {

                // decrease item from shopping cart
                this.shoppingCart[`item-${keyDataNum}`].buyQuantity--;
                // increase item quantity
                this.menuItems[`item-${keyDataNum}`].quantity++;
                this.cartItemCnt--;

                // local storage
                if(this.lsInUse) {
                    localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
                    localStorage.setItem("cartItemCnt", this.cartItemCnt);
                };

                this.calculateTotalCost()
                return;
            }
            else {

                console.log("ok, empty now")
                return
            }
          
        },

        increaseItemQty(event) {

            let keyDataNum = event.path[5].dataset.item;
            let curntShoppingCrtItem = this.shoppingCart[`item-${keyDataNum}`];
            
            let curntMenuItem = this.menuItems[`item-${keyDataNum}`];
            
            if(curntMenuItem.quantity > 0) {

                // decrease item quantity
                this.menuItems[`item-${keyDataNum}`].quantity--;

                // increase client buy quantity
                this.shoppingCart[`item-${keyDataNum}`].buyQuantity++;
                
                this.cartItemCnt++;
                // local storage
                if(this.lsInUse) {
                    localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
                    localStorage.setItem("cartItemCnt", this.cartItemCnt);
                };

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
.shoppingCartItems {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.cartItem {
    
    width: 90%;
    padding: 10px 0 10px;
    border-bottom: 1px solid #ccbdae;
}
.cartItemName {
    text-align: left;
    font-weight: 600;
}
.subTotalWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    
}
.subTotalText {
    width: 90%;
    padding: 10px 0;
    font-weight: 600;
    border-bottom: 1px solid #ccbdae;
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

/*Tablet sizes*------------------------------------------------------*/
@media (min-width: 723px) {

 
}

/*Desktop sizes*-----------------------------------------------------*/
@media (min-width: 1023px) {
    .cartItem {
    
        width: 45rem;
        padding: 10px 0 10px;
        border-bottom: 1px solid #ccbdae;
    }
    .subTotalText {
        width: 45rem;
        padding: 10px 0;
        font-weight: 600;
        border-bottom: 1px solid #ccbdae;
    }
    

}



</style>
