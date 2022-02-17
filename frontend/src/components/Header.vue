<script>
import MySVGComponent from '@/components/Svg.vue'
import { defineComponent } from 'vue'
import { globalState } from '../statestore/composition'

export default defineComponent({
  setup() {
    const { cartItemCnt } = globalState();
    
    return { // make it available in <template>
      cartItemCnt,
      
    }
  },
  components: {
    MySVGComponent
  },
})
</script>
<template>

    <header class="menu">
        <div class="menu-wrap">
            <img src="/img/stories-logo-300x300-white.png" class="logo-img" alt="Logo">
            <img src="/img/stories-logo-200x200-white.png" class="mobile-logo-img" alt="Logo">
            <input type="checkbox" id="checkbox">
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </nav>
            <label for="checkbox">
                <MySVGComponent />
            </label>
        </div>
    </header>
   
    
</template>

<style scoped>
header {
    background-color: black;
    padding: 10px 0;
    box-shadow: 0 1px 0 rgb(0 0 0 / 10%);
}
.menu-wrap {
    display: flex;
    justify-content: space-between;
    padding: 0px 35px 0px 0;
    height: 124px;
}
.logo-img {
    max-width: 100%;
    height: auto;
    display: none;
}
.mobile-logo-img {
    max-width: 100%;
    height: auto;
    display: block;
    padding: 5px 10px;
}
.menu-icon {
    /* font-size: 2.4em; */
    color: white;
    line-height: 50px;
    padding-top: 40px;
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
    .menu-icon {
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
        color: #F0F0E4;
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