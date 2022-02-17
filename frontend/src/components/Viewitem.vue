// this component works together with and is imported by Menuitems.vue component
// this is intended to be a popup modal displaying item information

<template>
   {{ this.currentItemView['name'] }}
   <p>test is this showing?</p>
    
</template>
<script>

import { defineComponent } from 'vue'
import { globalState } from '../statestore/composition'

export default defineComponent({
    name: "Viewitem",
    setup() {
        const { cartItemCnt, menuItems, shoppingCart, currentItemView } = globalState();

        return { // make it available in <template>
            cartItemCnt,
            menuItems,
            shoppingCart,
            currentItemView
        }
    },

    data() {

        return {

    
        }
    },

    mounted() {
        

    },

    methods: {

        
    },
})



</script>

<style scoped>


</style>
