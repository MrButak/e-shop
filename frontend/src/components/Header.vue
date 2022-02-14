<script>
import { defineComponent } from 'vue'
import { useComposition } from '../compositions/composition'

export default defineComponent({
  setup() {
    const { message } = useComposition();

    return { // make it available in <template>
      message
    }
  },
})
</script>
<template>
    {{ message }}
    <button @click="this.message = 'New message'">change message</button>
</template>