import { ref } from 'vue'

const cartItemCnt = ref(0)
const testy = ref('this is a test')

export const cartItemCount = function() {

  // other functions, for example to mutate message ref
  
  return {
    cartItemCnt,
    testy
    // ...
  }
}