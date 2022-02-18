<template>

    <h2 class="menuTitle">Menu</h2>
    <div id="menuCardWrapperMain">
        
        <div v-for="item in this.menuItems" id="menuCardWrapper" :data-item="item['id']">
            
            <img :src="item['imageUrl']"/> 

         <!--   <text>{{ item['description'] }}</text>
            <text>stock  {{ item['quantity'] }}</text>
            <text v-if="item['inStock'] === 1">available - in stock</text>
            <text v-else>out of stock</text>  -->
            <h3 class="menuItemName">{{ item['name'] }}</h3>
            <text class="menuPrice"> price: ${{ item['price'] }}</text>

            <div class="menuItemBtnWrapper">
                <!-- will trigger modal popup -->
                <button @click="this.toggleModal">View Item</button>
                <button @click="addToCart">Add to cart</button>
            </div>
        </div>
    </div>
  <!--  <button @click="this.toggleModal" class="trigger">View Item</button> -->
   <div class="modal">
        <div class="modal-content">
            <span @click="this.toggleModal" class="close-button">&times;</span>
            <h1>This is where I'll put my info</h1>
        </div>
    </div>
</template>
<script>

import axios from 'axios';
import { defineComponent } from 'vue';
import { globalState } from '../statestore/composition';

export default defineComponent({

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

            modal: document.querySelector(".modal"),
            trigger: document.querySelector(".trigger"),
            closeButton: document.querySelector(".close-button")
    
        }
    },

    // on load of home page, call this function to retreive menu items from database
    mounted() {
        this.getMenuItems();

    },

    methods: {

        toggleModal() {
            this.modal.classList.toggle("show-modal");
        },

        windowOnClick(event) {
            if (event.target === this.modal) {
                this.toggleModal();
            }
        },

        testy(e) {

            
            let menuItemNum = e.path[2].dataset.item;
            this.currentItemView = this.menuItems[`item-${menuItemNum}`];
            
        },

        // function queries database to get menu items and info (function is called on page load (mount()))
        async getMenuItems() {

            

            let response = await axios({
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: 'http://127.0.0.1:3000/getmenu',
                data: null
            })
            
            .then((response) => {
                
                // set global state of menuItems object
                let tmpItemCnt = 1
                response.data.forEach((item) => {
                    this.menuItems[`item-${tmpItemCnt}`] = item;
                    // add a buyQuantity property to the object
                    this.menuItems[`item-${tmpItemCnt}`].buyQuantity = 0;
                    tmpItemCnt++;
                });
            });

            this.modal = document.querySelector(".modal");
            this.trigger = document.querySelector(".trigger");
            this.closeButton = document.querySelector(".close-button");

            this.trigger.addEventListener("click", toggleModal);
            this.closeButton.addEventListener("click", toggleModal);
            window.addEventListener("click", windowOnClick);
            return;
        },

        addToCart(event) {
            
            // menu item clicked
            this.cartItemCnt++
            // if item already exists in shopping cart, increase order quantity
            if(this.shoppingCart[`item-${event.path[2].dataset.item}`]) {
                this.shoppingCart[`item-${event.path[2].dataset.item}`].buyQuantity++
            }
            // else add item to shopping cart
            else {
                this.shoppingCart[`item-${event.path[2].dataset.item}`] = this.menuItems[`item-${event.path[2].dataset.item}`];
                this.shoppingCart[`item-${event.path[2].dataset.item}`].buyQuantity = 1;
            }
            
            console.log(this.shoppingCart)
            
            
        }
        
    },
})



</script>

<style scoped>

.menuTitle {
    text-align: center;
    font-weight: 800;
}
#menuCardWrapperMain {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding: 10px;
    gap: 10px; 
}
#menuCardWrapper {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    flex: 1 1 40%; /*grow | shrink | basis */
    gap: 10px;
    min-height: 100%
}
.menuItemName {

    text-align: center;
    font-weight: 600;
}
.menuPrice {
    text-align: center;
}
.menuItemBtnWrapper {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    width: 100%;
}

.modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transform: scale(1.1);
    transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: red;
    padding: 1rem 1.5rem;
    width: 24rem;
    border-radius: 0.5rem;
}

.close-button {
    float: right;
    width: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    cursor: pointer;
    border-radius: 0.25rem;
    background-color: lightgray;
}

.close-button:hover {
    background-color: darkgray;
}

.show-modal {
    opacity: 1;
    visibility: visible;
    transform: scale(1.0);
    transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
}
/*Desktop sizes*-----------------------------------------------------*/

@media (min-width: 1023px) {

    #menuCardWrapper {
    
    flex: 1 1 30%; /*grow | shrink | basis */
}

}
</style>
