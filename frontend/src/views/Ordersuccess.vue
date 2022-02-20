<template>
    <Header />
   <Orderconfirm />
   <Footer />
 
</template>

<script>
// @ is an alias to /src
import Orderconfirm from '@/components/Orderconfirm.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';




export default {
    name: 'Ordersuccess',
    components: {
        Header,
        Orderconfirm,
        Footer
    }
}
</script>
