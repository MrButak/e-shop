<template>
  
    <Menuitems/>
 
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Menuitems from '@/components/Menuitems.vue'


export default {
  name: 'Home',
  components: {
    Header,
    Menuitems
  }
}
</script>
