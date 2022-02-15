<template>
    
    <Header/>
    <Chkout/>
    <Footer/>
 
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Chkout from '@/components/Chkout.vue'
import Footer from '@/components/Footer.vue'



export default {
  name: 'Checkout',
  components: {
    Header,
    Chkout,
    Footer
  }
}
</script>