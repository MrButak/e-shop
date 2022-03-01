<template>

<router-view/>

</template>


<script>

import { defineComponent } from 'vue';
import { globalState } from './statestore/composition';

export default defineComponent({

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

        }
    },

    mounted() {
        
        this.handleLs();
    },

    methods: {

        handleLs() {
            this.lsInUse = true;
            if(this.checkLsAvailable) {
                
                if(localStorage.shoppingCart) {

                    this.restoreLs();
                    return;
                };

                // set local storage variables if doesn't exist
                this.lsInUse = true; // set global state
                localStorage.setItem("shoppingCart", "");
                localStorage.setItem("cartItemCnt", "");
                
            };
        },

        // Function checks if local storage is available for use on browser
        checkLsAvailable() {

            let tmpStr = "is local storage available?"
            try {
                localStorage.setItem("test", tmpStr);
                localStorage.removeItem(test);
                return true;
            } 
            catch (error) {
                this.lsInUse = false; // set global state
                // console.log(error)
                return false;
            };
        },

        // Function restores global state variables from local storage variables
        restoreLs() {

            this.lsInUse = true; // set global state

            let lsShpCrt = localStorage.getItem("shoppingCart");
            lsShpCrt = JSON.parse(lsShpCrt);

            // set global state variables
            this.shoppingCart = lsShpCrt;
            this.cartItemCnt = localStorage.getItem("cartItemCnt");
            return;
        }
    
    }
})

</script>

<style>

/*global styles*/
* {
    box-sizing: border-box;
    margin: 0px;
    /*univeral fluid text size*/
    font-size: 1.1875rem;
    font-size: clamp(1.1875rem, 1.175rem + 0.0625vw, 1.25rem);
    
}
* body {
    overflow-x: hidden;
    min-height: 100vh;
    
    /* For footer to stay at bottom!!! */
    position: relative;
    padding-bottom: 4rem;
   
}
.payProcessBtn {
    background-color: #1980b6;
    border-radius: 6px;
    color: #fff;
    padding: 6px 24px;
    text-decoration: none;
}
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
.subTotal {
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


.pageTitle {

    text-align: center;
    font-weight: bolder;
    color: #666;
    
    padding: 28px 0 20px 0;
   /* font-family: 'Dancing Script', cursive;*/
    font-family: 'Philosopher', sans-serif;
    font-size: 1.75rem;
    font-size: clamp(1.75rem, 1.575rem + 0.8750000000000001vw, 2.625rem);
    
}
.menuItemName {

    font-family: 'Philosopher', sans-serif;
    text-align: center;
    font-weight: 600;
    color: #666;
    background-color: #feecea;
    border-bottom: .3px solid #f8cdc9;
    padding: 2rem 0 1rem;
    
}

</style>