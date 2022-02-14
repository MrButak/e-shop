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
</script>
<template>
    <p>Number of items in cart</p>
    <p>{{ cartItemCnt }}</p>
    <div v-if="this.cartItemCnt > 0">

        <button>Checkout</button>

    </div>
</template>