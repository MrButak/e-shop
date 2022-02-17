import { ref } from 'vue';

const cartItemCnt = ref(0);
const menuItems = ref({});
const shoppingCart = ref({});
const customerDetails = ref({});

export const globalState = function() {

  // other functions, for example to mutate message ref
  
  return {
    cartItemCnt,
    menuItems,
    shoppingCart,
    customerDetails
  };
};