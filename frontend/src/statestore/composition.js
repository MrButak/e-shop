import { ref } from 'vue'

const cartItemCnt = ref(0)
const menuItems = ref({})

export const cartItemCount = function() {

  // other functions, for example to mutate message ref
  
  return {
    cartItemCnt,
    menuItems
    // ...
  }
}