// TODO: to prevent error on page refresh. Check for global state variable (not created yet). If not present, redirect to /shoppingcart (.vue)
<template>
    <Header />
    <Usrvalidation/>
 
</template>

<script>
// @ is an alias to /src
import Usrvalidation from '@/components/Usrvalidation.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'Uservalidation',
  components: {
    Header,
    Usrvalidation
  }
}
</script>

