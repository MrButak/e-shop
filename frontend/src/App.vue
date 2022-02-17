<template>
 <!--   <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/Shoppingcart">Shopping Cart</router-link> |
    </div> -->
    <router-view/>
</template>

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
</style>