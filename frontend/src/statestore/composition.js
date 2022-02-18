import { ref } from 'vue';

const cartItemCnt = ref(0);
const menuItems = ref(0);
const shoppingCart = ref({});
const customerDetails = ref({});
const currentItemView = ref({});

export const globalState = function() {

  
  // other functions, for example to mutate message ref
  
  return {
    cartItemCnt,
    menuItems,
    shoppingCart,
    customerDetails,
    currentItemView
  };
};