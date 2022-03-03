// This component works together with and is imported into Menuitems.vue and Dsktopmodal.vue component
<template>

<div class="mobileModalWrapper">
    <form action="">
        <div class="buyQtyBtnWrapper">
            <button class="itemQtyBtnAdjust itemQtyBtnAdjustDown" type="button" @click="decreaseItemQty"><Downarrow /></button>
            <input id="buyQtyTxtInput" name="qtyInput" :value="currentItemView['buyQtyInput']" min="1" pattern="[0-9]*">
            <button class="itemQtyBtnAdjust itemQtyBtnAdjustUp" type="button" @click="increaseItemQty"><Uparrow /></button>   
        </div>
    </form>
</div>

<div class="dsktopModalWrapper">
    <form action="">
        <div class="buyQtyBtnWrapper">
            <button class="itemQtyBtnAdjust itemQtyBtnAdjustDown" type="button" @click="decreaseItemQty"><Downarrow /></button>
            <input id="buyQtyTxtInput" name="qtyInput" :value="currentItemView['buyQtyInput']" min="1" pattern="[0-9]*">
            <button class="itemQtyBtnAdjust itemQtyBtnAdjustUp" type="button" @click="increaseItemQty"><Uparrow /></button>   
        </div>
    </form>
</div>

<div class="mobileModalWrapper">
    <div class="addToCrtAndContShoppingBtnWrapper">
        <button @click="addToCart">Add to cart</button>
        <button @click="toggleModal">Continue shopping</button>
    </div>
</div>

<div class="dsktopModalWrapper">
    <div class="addToCrtAndContShoppingBtnWrapper">
        <button @click="addToCart">Add to cart</button>
        <button @click="dsktopToggleModal">Continue shopping</button>
    </div>
</div>

</template>

<script>

import { defineComponent } from 'vue';
import { globalState } from '../statestore/composition';
import Downarrow from '@/components/svgs/Downarrow.vue';
import Uparrow from '@/components/svgs/Uparrow.vue';
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
    components: {
        Downarrow,
        Uparrow
    },
   
    data() {

        return {

            modal: {},
            dsktopModal: null,
        }
    },

    mounted() {
        
        this.setViewModal();
      
    },

    methods: {

        setViewModal() {

            this.modal = document.querySelector(".modal");
            this.dsktopModal = document.querySelector(".dsktopModal");
        },

        toggleModal() {

            this.modal.classList.toggle("show-modal");
            this.dsktopModal.classList.toggle("show-dsktopModal");
        },

        increaseItemQty() {

            // make sure number can't increase past item quantity in stock
            if(this.currentItemView['buyQtyInput'] >= this.menuItems[`item-${this.currentItemView['item_id']}`].quantity) {

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
            if(this.menuItems[`item-${this.currentItemView['item_id']}`].quantity < 1) {

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
            if(this.shoppingCart[`item-${this.currentItemView['item_id']}`]) {

                this.shoppingCart[`item-${this.currentItemView['item_id']}`].buyQuantity += this.currentItemView['buyQtyInput'];

                // local storage
                if(this.lsInUse) {
                    localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
                    console.log(localStorage.shoppingCart);
                    console.log("local storage updated");
                };
                
            }
            // else add item to shopping cart
            else {
                
                this.shoppingCart[`item-${this.currentItemView['item_id']}`] = this.menuItems[`item-${this.currentItemView['item_id']}`];
                this.shoppingCart[`item-${this.currentItemView['item_id']}`].buyQuantity = this.currentItemView['buyQtyInput'];
                // local storage
                if(this.lsInUse) {
                    localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
                    console.log(localStorage.shoppingCart);
                    console.log("local storage updated");
                };
            };

            // decrease qantity from menu item, later if payment successful then decrease quantity from database
            this.menuItems[`item-${this.currentItemView['item_id']}`].quantity -= this.currentItemView['buyQtyInput'];

            // after items added to cart, close modal
            this.toggleModal()
        }
    },
})


</script>

<style scoped>
.mobileModalWrapper {
    display: flex;
}
.dsktopModalWrapper {
    display: none;
}

.itemQtyBtnAdjust {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    border-top: none;
    border-bottom: none;
    
}
.itemQtyBtnAdjustDown {
    border-left: none;
}
.itemQtyBtnAdjustUp {
    border-right: none;
}
.addToCrtAndContShoppingBtnWrapper {

    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    gap: .8rem;
}  
.buyQtyBtnWrapper {

    display: flex;
    

}
#buyQtyTxtInput {
    text-align: center;
    width: 35px;
    border: none;
}
@media (min-width: 1023px) {
    .mobileModalWrapper {
        display: flex;
    }
    .dsktopModalWrapper {
        display: none;
    }
}
</style>
