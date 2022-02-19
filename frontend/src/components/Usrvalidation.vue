<!--<div v-for="item in this.shoppingCart" class="shoppingCartItems" :data-item="item['id']">
    
     only show cart items with positive quantity -->
   <!-- <div v-if="item['buyQuantity'] > 0" class="cartItem"> 
        <p class="cartItemName">{{ item.name }}</p>
        <form action="">
            <div class="qtyAdjustWrapper">
                <p>order quantity: {{ item.buyQuantity }}</p>
                
                <div class="buyQtyBtnWrapper">
                    <button type="button" @click="decreaseItemQty">-</button>
                    <input id="buyQtyTxtInput" :value="item['buyQuantity']" pattern="[0-9]*">
                    <button type="button" @click="increaseItemQty">+</button>
                </div>
            </div>
        <p>left in stock: {{ item.quantity }}</p>
        <p>total price: ${{ item.price * item.buyQuantity }}</p>
        </form>
    </div>
</div>

<div class="subTotal">
    <div class="subTotalText">
        <p>Subtotal: ${{ subTotal }}</p>
    </div>
</div> -->

<template>

    <p class="summarySubTitleText">Items ordered</p>

    <div class="orderSummaryWrapper">
        <div class="orderSummaryItems" v-for="item in this.shoppingCart">

            <div>
                <p>{{ item.name }}</p>
                <p>quantity: {{ item.buyQuantity }}</p>
                <p>price: ${{ item.price * item.buyQuantity }}</p>
            </div>

        </div>
    </div>
    <p class="summarySubTitleText">Delivery address</p>
    <div class="deliveryWrapperMain">
        <p>{{ this.customerDetails.user['add1Field'] }}</p>
        <p v-if="this.customerDetails.user['add2Field']">{{ add2Field }}</p>
        <p>{{ this.customerDetails.user['cityField'] }}, {{ this.customerDetails.user['stateField'] }} {{ this.customerDetails.user['posField'] }}</p>
        <p>{{ this.customerDetails.user['countryField'] }}</p>
        
    </div>

    <div class="summarySubTotalWrapper">
        <div class="summarySubTotalText">
            <p>Subtotal: ${{ subTotal }}</p>
        </div>
    </div>

    <router-link tag="button" class="payProcessBtn" to="/checkout">Pay</router-link>

    <!--    <div style="width: 90%;" class="deliverWrapper" v-for="customerInfo in this.customerDetails.user">
            <p>{{ customerInfo }}</p>
        </div> -->
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
        
        this.testy();
    },

    methods: {

       testy() {

           console.log(this.customerDetails)
           
       }
    },

})



</script>

<style>
.summarySubTitleText {

    font-weight: 600;
    margin-left: 5%;
    padding-top: 10px;

}
.orderSummaryWrapper {

    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    
}
.orderSummaryItems {

    width: 90%;
    padding: 10px 0 10px;
    border-bottom: 1px solid #ccbdae;
}
.deliveryWrapperMain {

    display: flex;
    flex-direction: column;
    padding: 10px 0;
    margin-left: 5%;
    width: 100%;
}
.deliveryWrapper {
    display: flex;
    width: 90%
}
.summarySubTotalWrapper {
    display:flex;
    justify-content: center;
    width: 100%;
    border-top: 1px solid #ccbdae;
    border-bottom: 1px solid #ccbdae;
}
.summarySubTotalText {
    width: 90%;
    padding: 10px 0;
    font-weight: 600;
    
   
}
</style>