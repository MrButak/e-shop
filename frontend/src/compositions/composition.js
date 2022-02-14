import { ref } from 'vue'

const message = ref('test');

export const useComposition = function() {

  // other functions, for example to mutate message ref
  
  return {
    message,
    // ...
  }
}