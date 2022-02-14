<template>
    
    <Header/>
    <Menuitems/>
    <Footer/>
 
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Menuitems from '@/components/Menuitems.vue'
import Footer from '@/components/Footer.vue'



export default {
  name: 'Home',
  components: {
    Header,
    Menuitems,
    Footer
  }
}
</script>
