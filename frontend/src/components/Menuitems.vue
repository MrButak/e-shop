<template>
    <h2>Menu</h2>
    <div id="menuCardWrapperMain">
        
        <div v-for="item in this.menuItems" id="menuCardWrapper" :data-item="item['id']">
            <text>{{ item['name'] }}</text>
            <img :src="item['imageUrl']"/> 

         <!--   <text>{{ item['description'] }}</text>
            <text>stock  {{ item['quantity'] }}</text>
            <text v-if="item['inStock'] === 1">available - in stock</text>
            <text v-else>out of stock</text>  -->

            <text> price {{ item['price'] }}</text>
            <button @click="addToCart">Add to cart</button>
        </div>
    </div>
    
</template>
<script>

import axios from 'axios';
import { defineComponent } from 'vue'
import { globalState } from '../statestore/composition'

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

        return {

    
        }
    },

    // on load of home page, call this function to retreive menu items from database
    mounted() {
        this.getMenuItems();

    },

    methods: {

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
            
            return;
        },

        addToCart(event) {
            
            // menu item clicked
            this.cartItemCnt++
            // if item already exists in shopping cart, increase order quantity
            if(this.shoppingCart[`item-${event.path[1].dataset.item}`]) {
                this.shoppingCart[`item-${event.path[1].dataset.item}`].buyQuantity++
            }
            // else add item to shopping cart
            else {
                this.shoppingCart[`item-${event.path[1].dataset.item}`] = this.menuItems[`item-${event.path[1].dataset.item}`];
                this.shoppingCart[`item-${event.path[1].dataset.item}`].buyQuantity = 1;
            }
            
            console.log(this.shoppingCart)
            
            
        }
        
    },
})



</script>

<style scoped>
#menuCardWrapperMain {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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
    min-height: 100%
}
</style>
