<template>
<Header />

<h2 class="pageTitle">Shopping Cart</h2>

<div v-if="this.cartItemCnt > 0">
    <Shoppingcrt />
   <div class="checkoutBtnWrapperMain">
        <div class="checkoutBtnWrapper">
            <button @click="toggleAddressForm" class="payProcessBtn">Checkout</button>
        </div>
    </div>

    <div class="addressFormWrapper">
        <Addressform />
    </div>
</div>

<div v-else>
    <p>No Items in shopping cart</p>
</div>

<!--<Footer />-->
 
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Shoppingcrt from '@/components/Shoppingcrt.vue';
import Footer from '@/components/Footer.vue';
import Addressform from '@/components/Addressform.vue';

import { defineComponent } from 'vue';
import { globalState } from '../statestore/composition';

export default {
    name: 'Shoppingcart',

    setup() {

        const { cartItemCnt, menuItems, shoppingCart } = globalState();

        return { // make it available in <template>
            cartItemCnt,
            menuItems,
            shoppingCart
        }
    },

    components: {

        Header,
        Shoppingcrt,
        Addressform,
        Footer
    },

    data() {

        return {

            addressFormWrapper: null,
            payProcessBtn: null
        }
    },

    mounted() {

        this.initDom();
    },

    methods: {

        initDom() {

            this.addressFormWrapper = document.querySelector('.addressFormWrapper');
            this.payProcessBtn = document.querySelector('.payProcessBtn');
        },

        toggleAddressForm() {

            this.addressFormWrapper.classList.toggle("show");
            this.payProcessBtn.classList.toggle("hide");
        }
        
    }
}
</script>
<style scoped>


.checkoutBtnWrapperMain {

    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px 0 0 0;
    
}
.checkoutBtnWrapper {
    width: 90%
}
.payProcessBtn {
    background-color: #1980b6;
    border-radius: 6px;
    color: #fff;
    padding: 6px 24px;
    text-decoration: none;
}



.addressFormWrapper {

    display: none;
}
.hide {
    display: none;
}
.show {

    display: flex;
}
/*Tablet sizes*------------------------------------------------------*/
@media (min-width: 723px) {

 
}

/*Desktop sizes*-----------------------------------------------------*/
@media (min-width: 1023px) {
    .addressFormWrapper {

        justify-content: center;
    }
    .checkoutBtnWrapperMain {

        display: flex;
        width: 100%;
        padding: 10px 0 0 0;
    }
    .checkoutBtnWrapper {
        width: 45rem;
    }

}
</style>