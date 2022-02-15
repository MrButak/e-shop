<script>
    import { defineComponent } from 'vue'
    import { cartItemCount } from '../statestore/composition'

    export default defineComponent({
    setup() {
        const { cartItemCnt } = cartItemCount();
        
        return { // make it available in <template>
        cartItemCnt,
        
        }
    },
    })
    const stripe =  Stripe('pk_test_51KSQNbAaTEmIXM6wL3LwNtZaJUdoM4PqzKuLQFjWv24tO3CEiugdMODrtIwK60mLl6UWDE4OCRWpj5a7uYipNTaB008sPbbmch');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paymentIntentClientSecret = urlParams.get('payment_intent_client_secret')
    //console.log(paymentIntentClientSecret)
    
    stripe
        .retrievePaymentIntent(paymentIntentClientSecret)
        .then(function(result) {
            // Handle result.error or result.paymentIntent
            console.log(result)
    });

</script>
<template>

    
</template>