

<template>
    
    <form id="address-form" action="" method="" autocomplete="on"> <!-- may have to toggleback on -->
        <p class="AddressFormTitle">Delivery Address</p>
        <p class="note"><em>* = required field</em></p>
        <!-- Avoid the word "address" in id, name, or label text to avoid browser autofill from conflicting with Place Autocomplete. Star or comment bug https://crbug.com/587466 to request Chromium to honor autocomplete="off" attribute. -->
        <label class="full-field">
            <span class="form-label">Name for order*</span>
            <input id="name" required="true" autocomplete="on" placeholder="Name" data-com.bitwarden.browser.user-edited="yes">
        </label>
        <label class="full-field">
            <span class="form-label">Email*</span><span class="note">required for receipt</span>
            <input type="email" id="email" required="" autocomplete="on" placeholder="Email" data-com.bitwarden.browser.user-edited="yes">
        </label>
        <label class="full-field">
            <span class="form-label">Deliver to*</span>
            <input id="ship-address" name="ship-address" required="" autocomplete="off" class="pac-target-input" placeholder="Enter a location" data-com.bitwarden.browser.user-edited="yes">
        </label>
        <label class="full-field">
            <span class="form-label">Apartment, unit, suite, or floor #</span>
            <input id="address2" name="address2">
        </label>
        <label class="full-field">
            <span class="form-label">City*</span>
            <input id="locality" name="locality" required="">
        </label>
        <label class="slim-field-left">
            <span class="form-label">State/Province*</span>
            <input id="state" name="state" required="" data-com.bitwarden.browser.user-edited="yes">
        </label>
        <label class="slim-field-right" for="postal_code">
            <span class="form-label">Postal code*</span>
            <input id="postcode" name="postcode" required="">
        </label>
        <label class="full-field">
            <span class="form-label">Country/Region*</span>
            <input id="country" name="country" required="" data-com.bitwarden.browser.user-edited="yes">
        </label>
        <label class="full-field">
            <span class="form-label">Additional notes</span>
            <input id="deliveryNote" autocomplete="off" placeholder="additional notes" data-com.bitwarden.browser.user-edited="yes">
        </label>
        <button @click="validateAddress" type="submit" class="my-button">Checkout</button>
        <!-- Reset button provided for development testing convenience.
    Not recommended for user-facing forms due to risk of mis-click when aiming for Submit button. -->
        <!--<input type="reset" value="Clear form">-->
    </form>
</template>

<script>
import { defineComponent } from 'vue';
import { globalState } from '../statestore/composition';

export default defineComponent ({

    name: 'Addressform',

    setup() {

        const { cartItemCnt, shoppingCart, customerDetails } = globalState();

        return { // make it available in <template>
            
            cartItemCnt,
            shoppingCart,
            customerDetails
        }
    },

    data() {

        return {
            autocomplete: null,
            name: null,
            email: null,
            address1Field: null,
            address2Field: null,
            postalField: null,
            country: null,
            state: null,
            locality: null,
            deliveryNote: null
        }
    },
    mounted() {

        this.initAutocomplete()

    },

    methods: {

        // This sample uses the Places Autocomplete widget to:
        // 1. Help the user select a place
        // 2. Retrieve the address components associated with that place
        // 3. Populate the form fields with those address components.
        // This sample requires the Places library, Maps JavaScript API.
        // Include the libraries=places parameter when you first load the API.
        // For example: 
        //<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

        

        initAutocomplete() {
            
            // console.log(process.env)
            // console.log(process.env.VUE_APP_GOOGLE_MAP_API)
            
            this.address1Field = document.querySelector('#ship-address');
            this.address2Field = document.querySelector('#address2');
            this.postalField = document.querySelector('#postcode');
            this.state = document.querySelector("#state");
            this.country = document.querySelector("#country");
            this.locality = document.querySelector("#locality");
            this.name = document.querySelector('#name');
            this.email = document.querySelector('#email');
            this.deliveryNote = document.querySelector('#deliveryNote');
            // Create the autocomplete object
            this.autocomplete = new google.maps.places.Autocomplete(this.address1Field, {

                // LatLngBounds: {radius: 20, center: {lat: 37.648770, lng: -91.5436738}},
                componentRestrictions: { country: ["us"] },
                fields: ["address_components", "geometry"],
                types: ["address"], 
            });

            this.address1Field.focus();
            // When the user selects an address from the drop-down, populate the
            // address fields in the form.
            this.autocomplete.addListener("place_changed", this.fillInAddress);
        },

        fillInAddress() {
            // Get the place details from the autocomplete object.
            const place = this.autocomplete.getPlace();
            let address1 = "";
            let postcode = "";
            // this.state = document.querySelector("#state");
            // this.country = document.querySelector("#country");
            // this.locality = document.querySelector("#locality");

            // Get each component of the address from the place details,
            // and then fill-in the corresponding field on the form.
            // place.address_components are google.maps.GeocoderAddressComponent objects
            // which are documented at http://goo.gle/3l5i5Mr
            for (const component of place.address_components) {
                const componentType = component.types[0];

                switch (componentType) {
                    case "street_number": {
                        address1 = `${component.long_name} ${address1}`;
                        break;
                    }

                    case "route": {
                        address1 += component.short_name;
                        break;
                    }

                    case "postal_code": {
                        postcode = `${component.long_name}${postcode}`;
                        break;
                    }

                    case "postal_code_suffix": {
                        postcode = `${postcode}-${component.long_name}`;
                        break;
                    }
                    case "locality":
                        this.locality.value = component.long_name;
                        break;
                    case "administrative_area_level_1": {
                        this.state.value = component.short_name;
                        break;
                    }
                    case "country":
                        this.country.value = component.long_name;
                        break;
                }
            }

            this.address1Field.value = address1;
            this.postalField.value = postcode;
            // After filling the form with address components from the Autocomplete
            // prediction, set cursor focus on the second address line to encourage
            // entry of subpremise information such as apartment, unit, or floor number.
            this.address2Field.focus();
        },

        async validateAddress(event) {

            
            event.preventDefault()
            const axios = require('axios');
            let deliveryInfo = {};

            // make sure form fields contain data (for some reason required is not working on the html)
            try {

                deliveryInfo = {

                    name: this.name.value,
                    email: this.email.value,
                    add1Field: this.address1Field.value,
                    add2Field: this.address2Field.value,
                    posField: this.postalField.value,
                    countryField: this.country.value,
                    stateField: this.state.value,
                    cityField: this.locality.value,
                    deliveryNote: this.deliveryNote.value
                };
                
            }

            catch {
        
                return
                
            };
            
            // validate address is local (salem, mo, usa)
            let response = await axios({
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: 'http://127.0.0.1:3000/validatedeliveryaddress',
                data: {
                    streetAddress: deliveryInfo.add1Field,
                    addressDetails: deliveryInfo.add2Field,
                    city: deliveryInfo.cityField,
                    state: deliveryInfo.stateField,
                    postalCode: deliveryInfo.posField,
                    country: deliveryInfo.countryField
                }
                 
            })
            
            .then((response) => {
                
                // if valid address
                if(response.data) {

                    // assign customer details to global state object
                    this.customerDetails.user = deliveryInfo;
                    this.$router.push('Uservalidation');
                }
                // TODO: display error message and clear form
                else {
                    console.log("not salem, mo address");
                    return;
                };
                
            });
            
        }

    }
});

</script>

<style scoped>
#address-form {

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 400px;
    padding: 60px 20px 20px 20px;
}
.AddressFormTitle {

    text-align: left;
    font-weight: 800;
    width: 100%;
    
}
.note {

    width: 100%;
    margin-block-start: 0;
    font-size: 8px;
}
.full-field {

    flex: 400px;
    margin: 15px 0;
}
.form-label {

    width: 100%;
    padding: 0.5em;
}
.pac-target-input:not(:-webkit-autofill) {
    animation-name: endBrowserAutofill;
}
input {
    width: 100%;
    height: 2.0rem;
    margin-top: 0;
    padding: 0.5em;
    border: 0;
    border-bottom: 1px solid #ccbdae;
  /*  font-family: "Roboto", sans-serif; */
  /*  font-size: 18px; */
}
.slim-field-left {
    flex: 1 150px;
    margin: 15px 15px 15px 0px;
}
.slim-field-right {
    flex: 1 150px;
    margin: 15px 0px 15px 15px;
}
.my-button {
    background-color: #1980b6;
    border-radius: 6px;
    color: #fff;
    padding: 6px 24px;
    text-decoration: none;
}
input[type="reset"] {
    width: auto;
    height: auto;
    border-bottom: 0;
    background-color: transparent;
    color: #686868;
   /* font-size: 14px; */
}
</style>