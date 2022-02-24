import { ref } from 'vue';
// vuex
const cartItemCnt = ref(0);
const subTotal = ref(0);
const menuItems = ref(0);
const shoppingCart = ref({});
const customerDetails = ref({});
const currentItemView = ref({});

export const globalState = function() {

  
  // other functions, for example to mutate message ref
  
  return {
    cartItemCnt,
    subTotal,
    menuItems,
    shoppingCart,
    customerDetails,
    currentItemView
  };
};