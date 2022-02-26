// This component works together with and is imported into Menuitems.vue component
<template>

<form action="">
    <div class="buyQtyBtnWrapper">
        <button type="button" @click="decreaseItemQty">-</button>
        <input id="buyQtyTxtInput" name="qtyInput" :value="currentItemView['buyQtyInput']" min="1" pattern="[0-9]*">
        <button type="button" @click="increaseItemQty">+</button>
        
    </div>
</form>

<button @click="addToCart">Add to cart</button>
<button @click="toggleModal">Continue shopping</button>

</template>

<script>

import { defineComponent } from 'vue';
import { globalState } from '../statestore/composition';
export default defineComponent({

    name: "Addtocartbtn",
    setup() {
        const { lsInUse, cartItemCnt, menuItems, shoppingCart, currentItemView } = globalState();

        return { // make it available in <template>

            cartItemCnt,
            menuItems,
            shoppingCart,
            currentItemView,
            lsInUse
        }
    },
   
    data() {

        return {

            modal: {}
        }
    },

    mounted() {
        
        this.setViewModal();
      
    },

    methods: {

        setViewModal() {

            this.modal = document.querySelector(".modal");
        },

        toggleModal() {

            this.modal.classList.toggle("show-modal");
        },

        increaseItemQty() {

            // make sure number can't increase past item quantity in stock
            if(this.currentItemView['buyQtyInput'] >= this.menuItems[`item-${this.currentItemView['id']}`].quantity) {

                return
            }
            // increase buy quantity input number
            this.currentItemView['buyQtyInput']++;
            
        },

        decreaseItemQty() {

            // TODO: display pop-up to confirm user wants to remove item from cart
            // make sure number can't go below 1
            if(this.currentItemView['buyQtyInput'] < 2) {
                return;
            };
            
            this.currentItemView['buyQtyInput']--;
        },

        addToCart() {
            
            //TODO: make a backend validation check on the input number
            
            // prevent adding to cart if quantity is 0
            if(this.menuItems[`item-${this.currentItemView['id']}`].quantity < 1) {

                // TODO: make 'out of stock' message more assertive; possibly using animation
                return;
            };

            // increase shopping cart items
            this.cartItemCnt += this.currentItemView['buyQtyInput'];
            // local storage
            if(this.lsInUse) {
                localStorage.setItem("cartItemCnt", this.cartItemCnt);
                console.log(localStorage.cartItemCnt);
                console.log("local storage updated");
            };

            // if item already exists in shopping cart, increase order quantity
            if(this.shoppingCart[`item-${this.currentItemView['id']}`]) {

                this.shoppingCart[`item-${this.currentItemView['id']}`].buyQuantity += this.currentItemView['buyQtyInput'];

                // local storage
                if(this.lsInUse) {
                    localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
                    console.log(localStorage.shoppingCart);
                    console.log("local storage updated");
                };
                
            }
            // else add item to shopping cart
            else {
                
                this.shoppingCart[`item-${this.currentItemView['id']}`] = this.menuItems[`item-${this.currentItemView['id']}`];
                this.shoppingCart[`item-${this.currentItemView['id']}`].buyQuantity = this.currentItemView['buyQtyInput'];
                // local storage
                if(this.lsInUse) {
                    localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
                    console.log(localStorage.shoppingCart);
                    console.log("local storage updated");
                };
            };

            // decrease qantity from menu item, later if payment successful then decrease quantity from database
            this.menuItems[`item-${this.currentItemView['id']}`].quantity -= this.currentItemView['buyQtyInput'];

            // after items added to cart, close modal
            this.toggleModal()
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
