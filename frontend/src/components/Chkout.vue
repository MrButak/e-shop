<template>
    <div id="formMainWrapper">
        <!-- Display a payment form -->
        <form id="payment-form">
            <div id="payment-element">
                <!--Stripe.js injects the Payment Element-->
            </div>
            <button @click="handleSubmit" id="submit">
                <div class="spinner hidden" id="spinner"></div>
                <span id="button-text">Pay now</span>
            </button>
            <div id="payment-message" class="hidden"></div>
        </form>
    </div> 
</template>

<script>
import axios from 'axios'
import { defineComponent } from 'vue';
import { globalState } from '../statestore/composition';

export default defineComponent ({
    name: 'Pay',

    setup() {
        const { customerDetails, cartItemCnt, menuItems, shoppingCart, subTotal } = globalState();

        return { // make it available in <template>
            cartItemCnt,
            menuItems,
            shoppingCart,
            subTotal,
            customerDetails
        }
    },

    mounted() {

        this.createPaymentIntent();
    },

    data() {
        return {
            
            stripe: Stripe('pk_test_51KSQNbAaTEmIXM6wL3LwNtZaJUdoM4PqzKuLQFjWv24tO3CEiugdMODrtIwK60mLl6UWDE4OCRWpj5a7uYipNTaB008sPbbmch'),
            elements: null,
            client_secret: null,
            messageContainerText: null
        }
    },

    methods: {

        
        // function requests backend to send payment information to stripe (called onMount())

        async createPaymentIntent() {

           
            let response = await axios({

                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: 'http://127.0.0.1:3000/create-payment-intent',
                data: {
                    name: this.customerDetails.user.name,
                    email: this.customerDetails.user.email,
                    add1Field: this.customerDetails.user.add1Field,
                    add2Field: this.customerDetails.user.add2Field,
                    posField: this.customerDetails.user.posField,
                    countryField: this.customerDetails.user.countryField,
                    stateField: this.customerDetails.user.stateField,
                    cityField: this.customerDetails.user.cityField,
                    deliveryNote: this.customerDetails.user.deliveryNote,
                    subTotal: this.subTotal,
                    shoppingCart: this.shoppingCart
                }
           
            })
            // change .then I am using async
            .then((response) => {
                
                // console.log(response)
                this.client_secret = response.data.clientSecret
                // directly after I receive the client_secret as a response I can render the stripe form with it
                this.renderStripeForm(this.client_secret)
                
            })

        },

        renderStripeForm(client_secret) {
            
                const options = {
                    clientSecret: client_secret,
                    
                    // Fully customizable with appearance API.
                    appearance: {
                        theme: 'stripe'
                    },
                };

                // Set up Stripe.js and Elements to use in checkout form, passing the client secret
                this.elements = this.stripe.elements(options);


                // Create and mount the Payment Element
                const paymentElement = this.elements.create('payment');
                paymentElement.mount('#payment-element');
        },

        async handleSubmit(event) {

            
            event.preventDefault();

            // turn loading spinner on
            this.setLoading(true);

            // asign var to access form elements
            let elements = this.elements;
            
            const { error } = await this.stripe.confirmPayment({
                
                elements,
                confirmParams: {
                // redirect to payment completion page
                return_url: 'http://localhost:8080/ordersuccess',
                },
            });

            // This point will only be reached if there is an immediate error when
            // confirming the payment. Otherwise, your customer will be redirected to
            // your `return_url`. For some payment methods like iDEAL, your customer will
            // be redirected to an intermediate site first to authorize the payment, then
            // redirected to the `return_url`.
            if (error.type === "card_error" || error.type === "validation_error") {
                this.showMessage(error.message);
            } 
            else {
                this.showMessage("An unexpected error occured.");
            }

            this.setLoading(false);
        },

        // Fetches the payment intent status after payment submission
        async checkStatus() {
            const clientSecret = new URLSearchParams(window.location.search).get(
                "payment_intent_client_secret"
            );
            
            if (!clientSecret) {
                return;
            }

            const { paymentIntent } = await this.stripe.retrievePaymentIntent(clientSecret);
            
            switch (paymentIntent.status) {

                case "succeeded":
                    this.showMessage("Payment succeeded!");
                    break;
                case "processing":
                    this.showMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    this.showMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    this.showMessage("Something went wrong.");
                    break;
            }
            
        },

        // ------- UI helpers -------

        showMessage(messageText) {

            const messageContainer = document.querySelector("#payment-message");
            messageContainer.classList.remove("hidden");
            messageContainer.textContent = messageText;

            setTimeout(function () {
                messageContainer.classList.add("hidden");
                messageContainer.textContent = "";
            }, 8000);
        },

        // Show a spinner on payment submission
        setLoading(isLoading) {

            if (isLoading) {
                // Disable the button and show a spinner
                document.querySelector("#submit").disabled = true;
                document.querySelector("#spinner").classList.remove("hidden");
                document.querySelector("#button-text").classList.add("hidden");
            } 
            
            else {
                document.querySelector("#submit").disabled = false;
                document.querySelector("#spinner").classList.add("hidden");
                document.querySelector("#button-text").classList.remove("hidden");
            }
        } 

    },

    
})
</script>

<style scoped>


body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100vh;
  width: 100vw;
}
#formMainWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
form {
    width: 30vw;
    min-width: 500px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
}

.hidden {
  display: none;
}

#payment-message {
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
}

#payment-element {
  margin-bottom: 24px;
}

/* Buttons and links */
button {
  background: #5469d4;
  font-family: Arial, sans-serif;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
}
button:hover {
  filter: contrast(115%);
}
button:disabled {
  opacity: 0.5;
  cursor: default;
}

/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
  border-radius: 50%;
}
.spinner {
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.spinner:before,
.spinner:after {
  position: absolute;
  content: "";
}
.spinner:before {
  width: 10.4px;
  height: 20.4px;
  background: #5469d4;
  border-radius: 20.4px 0 0 20.4px;
  top: -0.2px;
  left: -0.2px;
  -webkit-transform-origin: 10.4px 10.2px;
  transform-origin: 10.4px 10.2px;
  -webkit-animation: loading 2s infinite ease 1.5s;
  animation: loading 2s infinite ease 1.5s;
}
.spinner:after {
  width: 10.4px;
  height: 10.2px;
  background: #5469d4;
  border-radius: 0 10.2px 10.2px 0;
  top: -0.1px;
  left: 10.2px;
  -webkit-transform-origin: 0px 10.2px;
  transform-origin: 0px 10.2px;
  -webkit-animation: loading 2s infinite ease;
  animation: loading 2s infinite ease;
}

@-webkit-keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@media only screen and (max-width: 600px) {
  form {
    width: 80vw;
    min-width: initial;
  }
}

</style>