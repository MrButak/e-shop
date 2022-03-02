<template>


    <div class="titleAndEditBtnWrapper">
        <p class="summarySubTitleText">Items ordered</p>
        <a @click="this.$router.push('shoppingcart')"><p>edit cart</p></a>
    </div>


<div class="orderSummaryWrapper">
    <div class="orderSummaryItems" v-for="item in this.shoppingCart">

        <div>
            <p>{{ item.name }}</p>
            <p>quantity: {{ item.buyQuantity }}</p>
            <p>price: ${{ item.price * item.buyQuantity }}</p>
        </div>
    </div>
    
</div>

    <div class="titleAndEditBtnWrapper">
        <p class="summarySubTitleText">Delivery address</p>
        <!-- TODO: have scroll down to address form. Set an anchor. /#address -->
        <a @click="this.$router.push('shoppingcart')"><p>edit address</p></a>
    </div>


<div class="deliveryWrapperMain">
    <p>{{ this.customerDetails.user['name'] }}</p>
    <p>{{ this.customerDetails.user['email'] }}</p>
    <p>{{ this.customerDetails.user['add1Field'] }}</p>
    <p v-if="this.customerDetails.user['add2Field']">{{ add2Field }}</p>
    <p>{{ this.customerDetails.user['cityField'] }}, {{ this.customerDetails.user['stateField'] }} {{ this.customerDetails.user['posField'] }}</p>
    <p>{{ this.customerDetails.user['countryField'] }}</p>
    <p v-if="this.customerDetails.user['deliveryNote']">{{ this.deliveryNote }}</p>
    
</div>

<div class="summarySubTotalWrapper">
    <div class="summarySubTotalText">
        <p>Subtotal: ${{ subTotal }}</p>
    </div>
</div>

<div class="payBtnWrapper">
    <router-link tag="button" class="payProcessBtn" to="/checkout">Pay</router-link>
</div>

</template>


<script>

import { defineComponent } from 'vue';
import { globalState } from '../statestore/composition';

export default defineComponent({

    name: 'Usrvalidation',

    setup() {
        const { cartItemCnt, shoppingCart, customerDetails, subTotal } = globalState();

        return { // make it available in <template>
            
            cartItemCnt,
            shoppingCart,
            customerDetails,
            subTotal
        }
    },

    mounted() {
        
  
    },

    methods: {


    },

})

</script>

<style scoped>
.titleAndEditBtnWrapperMain {
    display: flex;
    justify-content: space-between;
    width: 100%;
    
    
}
.titleAndEditBtnWrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;
}
.summarySubTitleText {

    font-weight: 600;

}
.orderSummaryWrapper {

    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 0 10px 0;
    
}
.orderSummaryItems {

    width: 100%;
    padding: 10px 20px;
    border-bottom: 1px solid #ccbdae;
}
.deliveryWrapperMain {

    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    
    width: 100%;
}
.deliveryWrapper {
    display: flex;
    width: 100%
}
.summarySubTotalWrapper {
    display:flex;
    justify-content: center;
    width: 100%;
    border-top: 1px solid #ccbdae;
    border-bottom: 1px solid #ccbdae;
}
.summarySubTotalText {
    width: 100%;
    padding: 10px 20px;
    font-weight: 600;
}


.payBtnWrapper {
    display:flex;
    padding: 15px 0 0 20px;
    
}
.payProcessBtn {
    background-color: #1980b6;
    border-radius: 6px;
    color: #fff;
    padding: 6px 24px;
    text-decoration: none;
}
/*Tablet sizes*------------------------------------------------------*/
@media (min-width: 723px) {

 
}

/*Desktop sizes*-----------------------------------------------------*/
@media (min-width: 1023px) {

    .titleAndEditBtnWrapper {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 12px 15rem 0 15rem;
    }
    .orderSummaryWrapper {

        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 0 15rem;
        
    }
    .orderSummaryItems {

        width: 100%;
        padding: 10px 0;
        border-bottom: 1px solid #ccbdae;
    }
    .deliveryWrapperMain {

        display: flex;
        flex-direction: column;
        padding: 10px 15rem;
        width: 100%;
    }
    .summarySubTotalWrapper {
        display:flex;
        justify-content: center;
        width: 100%;
        padding: 0 15rem;
        border: none;

        
    }
    .summarySubTotalText {
        width: 100%;
        padding: 10px 0;
        font-weight: 600;
        border-top: 1px solid #ccbdae;
        border-bottom: 1px solid #ccbdae;

    }
    .payBtnWrapper {
        display: flex;
        padding: 10px 15rem;
        
    }
}

</style>