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
        var self=this;
        self.stripe= Stripe(self.spk);
        self.card = self.stripe.elements().create('card');
        self.card.mount(self.$refs.card);
        
    },

    data() {

        return {

            spk:"pk_test_51KSQNbAaTEmIXM6wL3LwNtZaJUdoM4PqzKuLQFjWv24tO3CEiugdMODrtIwK60mLl6UWDE4OCRWpj5a7uYipNTaB008sPbbmch",
            stripe:undefined,
            card:undefined,
            payAmount:"$10.00",
            lockSubmit:false,
            api:"https://yourdomain.com/api/"
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
                const stripe = Stripe("pk_test_51KSQNbAaTEmIXM6wL3LwNtZaJUdoM4PqzKuLQFjWv24tO3CEiugdMODrtIwK60mLl6UWDE4OCRWpj5a7uYipNTaB008sPbbmch");
                const appearance = {
                    theme: 'stripe',
                }
                // initialize stripe ui library withe  client secret received from stripe
                let clientSecret = response.data.clientSecret;
                
            })
        },

        purchase() {
            var self = this;
            self.lockSubmit=true

            self.stripe.createToken(self.cardNumber).then(function(result) {
                if (result.error) {
                alert(result.error.message)
                self.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
                self.lockSubmit=false
                return;
                }
                else{ 
                self.processTransaction(result.token.id)
                }
            })
            .catch((err) => {
                alert("error: "+err.message)
                self.lockSubmit=false
            });
        },

        processTransaction(transactionToken){
            var self=this;
            dt= {
                amount:self.stripCurrency(self.payAmount), //stripe uses an int [with shifted decimal place] so we must convert our payment amount
                currency:"USD",
                description:"something to say",
                token:transactionToken
            }
            var route=self.api+"/charge/card"
            self.$http.post(route,dt, {
                headers: {
                }
            }).then(response => {

                if(response.status==200){
                    alert("Transaction succeeded")
                    self.lockSubmit=false
                }
                else{
                    throw new Error("failed donation")
                }

            }).catch((err) => {
                alert("error: "+err.message)
                self.lockSubmit=false
            });

        },

            stripCurrency(val){
                return val.replace(',','').relpace('$','').replace('.','')
            
            }

      
            
    }

})

</script>