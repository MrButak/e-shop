<element>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <!-- Display a payment form -->
    <form id="payment-form">
      <div id="payment-element">
        <!--Stripe.js injects the Payment Element-->
      </div>
      <button id="submit">
        <div class="spinner hidden" id="spinner"></div>
        <span id="button-text">Pay now</span>
      </button>
      <div id="payment-message" class="hidden"></div>
    </form>

</element>






<script>
import axios from 'axios';
import { defineComponent } from 'vue'
import { cartItemCount } from '../statestore/composition'
// const stripe = Stripe("pk_test_51KSQNbAaTEmIXM6wL3LwNtZaJUdoM4PqzKuLQFjWv24tO3CEiugdMODrtIwK60mLl6UWDE4OCRWpj5a7uYipNTaB008sPbbmch");

export default defineComponent({

    // send the payment intent to stripe as soon is module is loaded
    mounted() {

        this.createPaymentIntent()
        
    },

    data() {

        return {

            
        }
    },

    setup() {
    const { cartItemCnt } = cartItemCount();

        return { // make it available in <template>
            cartItemCnt,
            
        }
    },

    methods: {

        async createPaymentIntent() {
            
            let response = await axios({
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: 'http://127.0.0.1:3000/create-payment-intent',
                data: null
            })
            
            .then((response) => {
                // const stripe = Stripe("pk_test_51KSQNbAaTEmIXM6wL3LwNtZaJUdoM4PqzKuLQFjWv24tO3CEiugdMODrtIwK60mLl6UWDE4OCRWpj5a7uYipNTaB008sPbbmch");
                // const appearance = {
                //     theme: 'stripe',
                // }
                // initialize stripe ui library withe  client secret received from stripe
                let clientSecret = response.data.clientSecret;
                console.log(clientSecret)
                
            })
        },
        
    }

})

</script>