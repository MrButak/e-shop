<template>
    
    <Header/>
    <Shoppingcrt/>
    <Footer/>
 
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Shoppingcrt from '@/components/Shoppingcrt.vue'
import Footer from '@/components/Footer.vue'



export default {
  name: 'Shoppingcart',
  components: {
    Header,
    Shoppingcrt,
    Footer
  }
}
</script>