<template>
    
    <Header/>
    <Buyitems/>
    <Footer/>
 
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Buyitems from '@/components/Buyitems.vue'
import Footer from '@/components/Footer.vue'



export default {
  name: 'Checkout',
  components: {
    Header,
    Buyitems,
    Footer
  }
}
</script>