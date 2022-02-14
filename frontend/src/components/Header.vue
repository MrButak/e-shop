<script>
import { defineComponent } from 'vue'
import { cartItemCount } from '../statestore/composition'

export default defineComponent({
  setup() {
    const { cartItemCnt, testy } = cartItemCount();
    
    return { // make it available in <template>
      cartItemCnt,
      testy
    }
  },
})
</script>
<template>
    <p>{{ cartItemCnt }}</p>
    <p>{{ testy }}</p>
    <button @click="this.cartItemCnt++">change message</button>
</template>