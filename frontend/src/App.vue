<template>
 <!--   <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/Shoppingcart">Shopping Cart</router-link> |
    </div> -->
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
                
                if(this.checkLsAvailable) {
                    
                    if(localStorage.shoppingCart) {

                        this.restoreLs();
                        return;
                    };
                //
                    
                }
            },

            // Function checks if local storage is available for use on browser
            checkLsAvailable() {

                let tmpStr = "is local storage available?"
                try {
                    localStorage.setItem("test", tmpStr);
                    localStorage.removeItem(test);
                    this.lsInUse = true; // set global state
                    return true;
                } 
                catch (error) {
                    this.lsInUse = false; // set global state
                    // console.log(error)
                    return false;
                };
            },

            restoreLs() {

                // this.shoppingCart = localStorage.get()
            }
        
        }
    })
</script>

<style>
/*global style.css*/
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
</style>