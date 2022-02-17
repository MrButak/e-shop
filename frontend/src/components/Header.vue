<script>
import HamburgMenu from '@/components/svgs/Hamburgmenu.vue'
import ShoppingCartIcon from '@/components/svgs/Shoppingcart.vue'
import { defineComponent } from 'vue'
import { globalState } from '../statestore/composition'

export default defineComponent({
  setup() {
    const { cartItemCnt } = globalState();
    
    return { // make it available in <template>
      cartItemCnt,
      
    }
  },
  // svg icons
  components: {
    HamburgMenu,
    ShoppingCartIcon
  },
})
</script>


<template>

    <header class="menu">
        <div class="menu-wrap">
           
            <input type="checkbox" id="checkbox">
            <label class="hamburg-menu-icon" for="checkbox">
                <HamburgMenu />
            </label>
           <!-- <img src="" class="mobile-logo-img" alt="Logo"> -->
           <router-link style="text-decoration: none;" to="/"><h1>Smoothie Shop</h1></router-link>
            <nav>
                <ul>
                    <li><router-link to="/">Menu</router-link></li>
                    <li><router-link to="/shoppingcart">Shopping cart</router-link></li>
                    <li><router-link to="/about">About</router-link></li>
                </ul>
            </nav>
            <router-link style="text-decoration: none;" to="/Shoppingcart">
                <div class="shoppingCartWrapper">
                    <span class = shopping-cart-icon>
                        <ShoppingCartIcon />
                    </span>
                    <span class="cartCount">({{ cartItemCnt }})</span>
                </div>
            </router-link>
            <img src="" class="logo-img" alt="Logo">
           
        </div>
    </header>
   
    
</template>

<style scoped>


header {
    background-color: #feecea;
    padding: 10px 0;
    
    
}
.menu-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
}

.shoppingCartWrapper {

    display: flex;
    padding: 5px 18px 0 0;
 
}

.shopping-cart-icon {
    
}
.cartCount {
    font-size: 19px;
    color: #333;
    font-weight: 400;
    padding: 6px 0 0 1px;
    /*padding: 0 0 0 0;
    margin: -5px 0 0 13px;
    display: inline-block;
    position: absolute; */
}

.logo-img {
    max-width: 100%;
    height: auto;
    display: none;
}
.mobile-logo-img {
    max-width: 100%;
    height: auto;
   
}
.hamburg-menu-icon {

    padding: 0 0 0 18px;
    
}

nav {
    position: absolute;
    background-color: white;
    top: 143px;
    left:0;
    width: 100%; 
}
nav ul {
    list-style-type: none;
    max-height: 0px;
    overflow: hidden;
    transition: all .2s;
    
}
nav ul li {
    padding: 0 15px;
}
nav ul li a {
    display: inline-block;
    padding: 12px;
    color: black;
    text-decoration: none;
    letter-spacing: 0.05em;
}
nav ul li a:hover, nav ul li a:focus {
    color: #DB5F29;
}
#checkbox {
    display: none;
}
#checkbox:checked ~ nav ul {
    max-height: 190px;
    padding: 15px 0;
    transition: all 0.5s;
    border: 1px solid black;
    background-color: white;
}
/*Tablet sizes---------------------------------------------------------*/
@media (min-width: 768px) {

    /*Header start*/
    .logo-img {
        max-width: 100%;
        height: auto;
        display: block;
        padding: 5px 10px;
    }
    .mobile-logo-img {
        max-width: 100%;
        height: auto;
        display: none;
    }
    .hamburg-menu-icon {
        display: none;
    }
    nav {
        top: -10px;
        background-color: transparent; 
    }
    nav ul {
    max-height: 178px;
    padding: 55px 25px 0 0;
    
    align-items: center;
    text-align: right;
    /* font-size: 26px; */
    }
    nav ul li {
        display: inline-flex;
        padding: 0px;  
    }
    #checkbox:checked ~ nav ul {
        padding-top: 55px;
        border: none;
    }
    nav ul li a {
        color: rgba(0,0,0,0.8);
        
    }
}
/*Desktop sizes*-----------------------------------------------------*/

@media (min-width: 1200px) { 

    /*Header start*/
    .logo-img {
        max-width: 100%;
        height: auto;
        display: block;
    }
    .mobile-logo-img {
        max-width: 100%;
        height: auto;
        display: none;
    }
    .menu-icon {
        display: none;
    }
    nav {
        top: -10px;
        background-color: transparent;
    }
    nav ul {
        max-height: 178px;
        padding: 55px 25px 0 0;;
        padding-right: 75px;
        align-items: center;
        text-align: right;
        /* font-size: 28px; */
    }
    nav ul li {
        display: inline-flex;
        padding-left: 20px;
    }
    
    .logo-img {
        max-width: 100%;
        height: auto;
        padding-left: 75px;
    }
    #checkbox:checked ~ nav ul {
        padding-top: 55px;
        padding-right: 150px;
        border: none;
    }
}
</style>