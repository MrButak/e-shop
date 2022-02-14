<template>
    <p>Menu Items</p>
    <div id="menuCardWrapperMain" v-for="item in this.menuItems">
        <div id="menuCardWrapper">
            {{ item['name'] }}
            {{ item['description'] }}
            stock  {{ item['quantity'] }}
            available {{ item['inStock'] }}
            price {{ item['price'] }}
        </div>
    </div>
    
</template>
<script>
import axios from 'axios';
import { defineComponent } from 'vue'
import { cartItemCount } from '../statestore/composition'

export default defineComponent({

    setup() {
        const { cartItemCnt, menuItems } = cartItemCount();

        return { // make it available in <template>
            cartItemCnt,
            menuItems
        }
    },

    // on load of home page, call this function to retreive menu items from database
    mounted() {
        this.getMenuItems();

    },

    methods: {

        // function queries database to get menu items and info (function is called on page load (mount()))
        async getMenuItems() {
            console.log("what's the deal?")
            let response = await axios({
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: 'http://127.0.0.1:3000/getmenu',
                data: null
            })
            
            .then((response) => {
                
                // set global state of menuItems object
                console.log(response.data.length)
                let itemCnt = 1

                response.data.forEach((item) => {
                    this.menuItems[`item-${itemCnt}`] = item;
                    itemCnt++;
                });
                console.log(this.menuItems);
            });
            
            return;
        },
        
    }


})



</script>

<style>
#menuCardWrapperMain {
    display: flex;
    width: 90%;    
}
#menuCardWrapper {
    display: flex;
    width: 50%;
    border: 1px solid black;
}
</style>
