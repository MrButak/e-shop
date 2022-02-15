<template>
    <form id="payment-form" data-secret="{{ client_secret }}">
        <div id="payment-element">
            <!-- Elements will create form elements here -->
        </div>

        <button id="submit">Submit</button>
    </form>
    
</template>

<script>
import axios from 'axios'

export default {
    name: 'Pay',
    //   props: {
    //     msg: String
    //   }


    data() {
        return {

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
                
                let client_secret = response.data.clientSecret
                console.log(response.data.clientSecret)
                this.renderStripeForm(client_secret)
                
            })
        },
        renderStripeForm(client_secret) {
            console.log(client_secret)
            const stripe = Stripe('pk_test_51KSQNbAaTEmIXM6wL3LwNtZaJUdoM4PqzKuLQFjWv24tO3CEiugdMODrtIwK60mLl6UWDE4OCRWpj5a7uYipNTaB008sPbbmch');
                const options = {
                    clientSecret: client_secret,
                    
                    // Fully customizable with appearance API.
                    appearance: {/*...*/},
                };

                // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 2
                const elements = stripe.elements(options);

                // Create and mount the Payment Element
                const paymentElement = elements.create('payment');
                paymentElement.mount('#payment-element');
        }
        

    },
    
    mounted() {
        
        document.onreadystatechange = () => {
            if (document.readyState == "complete") {
                console.log('Page completed with image and files!')
                this.createPaymentIntent()
                
            }
            
        }
        
    }
    
}
</script>

