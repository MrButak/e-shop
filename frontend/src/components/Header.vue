<template>

<header class="menu">
    <div class="menu-wrap">
        <img src="../../public/img/logo-desktop-300x145.png" class="desktopLogo" alt="Logo">
        <input type="checkbox" id="checkbox">
        <label class="hamburg-menu-icon" for="checkbox">
            <HamburgMenu />
        </label>
        
        <img src="../../public/img/logo-mobile-180x86.png" class="mobileLogo" alt="Logo">
        <!--<router-link style="text-decoration: none;" to="/">Salem Smoothies</router-link>-->
        <nav>
            <ul>
                <li><router-link to="/">Menu</router-link></li>
                <li class="shoppingCartLink"><router-link to="/shoppingcart">Shopping cart</router-link></li>
                <li><router-link to="/about">About</router-link></li>
            </ul>
        </nav>
        <router-link style="text-decoration: none;" to="/Shoppingcart">
            <div class="shoppingCartWrapper">
                <span class = shopping-cart-icon>
                    <ShoppingCartIcon />
                </span>
                <span class="cartCount">({{ this.cartItemCnt }})</span>
            </div>
        </router-link>
        
        
    </div>
</header>

</template>

<script>
import HamburgMenu from '@/components/svgs/Hamburgmenu.vue';
import ShoppingCartIcon from '@/components/svgs/Shoppingcart.vue';
import { defineComponent } from 'vue';
import { globalState } from '../statestore/composition';

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

<style scoped>

header {
    background-color: #feecea;
    padding: 10px 0 10px 0;
    
    
}
.menu-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
}
.mobileLogo {
        display: flex;
        padding: 0 0 0 0;
}
.desktopLogo {
    display: none;
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

.hamburg-menu-icon {
    padding: 0 0 0 18px;
}

nav {
    position: absolute;
    background-color: white;
    top: 116px;
    left:0;
    width: 100%;
    z-index: 3; 
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
/*Tablet sizes*-----------------------------------------------------*/
@media (min-width: 723px) {

    .cartCount {
        font-size: 19px;
        padding: 9px 0 0 1px;
        
    }
}
/*Desktop sizes*-----------------------------------------------------*/

@media (min-width: 1023px) { 

    /*Header start*/
    .desktopLogo {
        display: block;
        padding: 0 0 0 18px;
    }
    .mobileLogo {
        display: none;
    }
    
    .hamburg-menu-icon, .shoppingCartLink {
        display: none;
    }
    nav {
        top: -10px;
        background-color: transparent;
    }
    nav ul {
        /* set max height to header height*/
        max-height: 160px;
        padding: 7% 24% 0 0;
        text-align: right;
   
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
    .cartCount {
        font-size: 22px;
        padding: 9px 0 0 1px;
    }
}
</style>