<template>

<div class="editCrtWrapper">
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
<div class="editCrtWrapper">
    <p class="summarySubTitleText">Delivery address</p>
    <!-- TODO: (maybe) send user to a seperate view for address form -->
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

.summarySubTitleText {

    font-weight: 600;

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
.editCrtWrapper {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 0 0 0 5%;
    
}

.payBtnWrapper {
    display:flex;
    padding-top: 15px;
    margin-left: 5%;
}
</style>