<template>

    <h2 class="menuTitle">Menu</h2>
    <div id="menuCardWrapperMain">
        
        <div v-for="item in this.menuItems" id="menuCardWrapper" :data-item="item['id']">
            
            <img :src="item['imageUrl']"/> 

         <!--   <text>{{ item['description'] }}</text>
            <text>stock  {{ item['quantity'] }}</text>
            <text v-if="item['inStock'] === 1">available - in stock</text>
            <text v-else>out of stock</text>  -->
            <h3 class="menuItemName">{{ item['name'] }}</h3>
            <p class="menuPrice"> price: ${{ item['price'] }}</p>
            <!-- show message if out of stock -->

            <!-- TODO: add a class list to out of stock items which will dim the backgound color and make 'out of stock' more obvious -->
            <p v-if="item['quantity'] < 1">Out of stock</p>
            <div class="menuItemBtnWrapper">
                <!-- click function will set global view item (this.currentItemView) and trigger modal popup -->
                <span @click="this.setViewItem">
                    <button @click="this.toggleModal" class="trigger">View Item</button>
                </span>

                <!-- Have decided (for now) to remove the add to cart button from menu. Adding something to cart can be done in view item popup modal-->
                <!-- <button @click="addToCart">Add to cart</button> -->
            </div>
        </div>
    </div>
  
    <div class="modal">
        
        <div class="modal-content">
            <div class="modalContentWrapper">
               <!-- <span @click="this.toggleModal" class="close-button">&times;</span> -->
                <img :src="this.currentItemView['imageUrl']"/>
                <h3 class="menuItemName">{{ this.currentItemView['name'] }}</h3>
                <p>{{ this.currentItemView['description'] }}</p>
                <p>Price: ${{ this.currentItemView['price'] }}</p>
                <!-- show message if out of stock -->
                <p v-if="this.currentItemView['quantity'] > 0">in stock: {{ this.currentItemView['quantity'] }}</p>
                <p v-else>Out of stock</p>
                <Addtocartbtn ref="addToCartBtn" />
            </div>
        </div>
        
    </div>
</template>
<script>

import axios from 'axios';
import { defineComponent } from 'vue';
import { globalState } from '../statestore/composition';
import Addtocartbtn from '../components/Addtocartbtn';
export default defineComponent({

    name: "Menuitems",
    setup() {
        const { lsInUse, cartItemCnt, menuItems, shoppingCart, currentItemView } = globalState();

        return { // make it available in <template>
            cartItemCnt,
            menuItems,
            shoppingCart,
            currentItemView,
            lsInUse
        }
    },

    components: {

        Addtocartbtn
    },
    
    data() {

        return {

            modal: null,
            trigger: null,
            closeButton: null
        }
    },

    // call database to set global menu item and display
    // set variables for the view item popup modal
    mounted() {

        this.checkForMenuItems();
        this.setViewModal();
    },

    methods: {

        checkForMenuItems() {

            if(this.menuItems === 0) {

                // I initially set the global state of menuItems to 0
                this.getMenuItems();
                return;
            };

            return;
        },

        toggleModal() {

            this.modal.classList.toggle("show-modal");
        },

        // function will set the global state currentItemView and make it available to the popup view item modal
        setViewItem(e) {

            let menuItemNum = e.path[3].dataset.item;
            this.currentItemView = this.menuItems[`item-${menuItemNum}`];
            // set the text input for buy quantity
            this.currentItemView['buyQtyInput'] = 1;
        },

        // function will hide modal if area outside of modal is clicked
        windowOnClick(event) {

            if (event.target === this.modal) {
                this.toggleModal();
            }
        },

        setViewModal() {

            this.modal = document.querySelector(".modal");
            this.trigger = document.querySelector(".trigger");
            this.closeButton = document.querySelector(".close-button");

            // click outside of modal to hide
            window.addEventListener("click", this.windowOnClick);
            
        },

        // function queries database to get menu items if global state object this.menuItems hasn't been assigned yet
        async getMenuItems() {

            let response = await axios({
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: 'http://127.0.0.1:3000/getmenu',
                data: null
            })
            
            .then((response) => {
                
                // set global state of menuItems object if it hasn't already been set
                this.menuItems = {};
                let tmpItemCnt = 1;

                response.data.forEach((item) => {
                    this.menuItems[`item-${tmpItemCnt}`] = item;
                    // add a buyQuantity property to the object
                    this.menuItems[`item-${tmpItemCnt}`].buyQuantity = 0;
                    tmpItemCnt++;
                });
            });

            
            return;
        },

        addToCart(event) {
            
            //TODO: make a backend validation check on the input number

            // menu item clicked
            this.cartItemCnt++
            // if item already exists in shopping cart, increase order quantity
            if(this.shoppingCart[`item-${event.path[2].dataset.item}`]) {
                this.shoppingCart[`item-${event.path[2].dataset.item}`].buyQuantity++
            }
            // else add item to shopping cart
            else {
                this.shoppingCart[`item-${event.path[2].dataset.item}`] = this.menuItems[`item-${event.path[2].dataset.item}`];
                this.shoppingCart[`item-${event.path[2].dataset.item}`].buyQuantity = 1;
            }
   
            
            
        }
        
    },
})



</script>

<style scoped>

/*start menu items display*/
.menuTitle {
    text-align: center;
    font-weight: 800;
}
#menuCardWrapperMain {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding: 10px;
    gap: 10px; 
}
#menuCardWrapper {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    flex: 1 1 40%; /*grow | shrink | basis */
    gap: 10px;
    min-height: 100%
}
.menuItemName {

    text-align: center;
    font-weight: 600;
}
.menuPrice {
    text-align: center;
}
.menuItemBtnWrapper {
    display: flex;
    justify-content: center;
    margin-top: auto;
    width: 100%;
}
/*end menu items*/

/*start view item popup modal*/
.modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transform: scale(1.1);
    transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
}
.modalContentWrapper {

    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;

    
}
.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 1rem 1.5rem;
    max-width: 90%;
    border-radius: 0.5rem;
}

.close-button {
    float: right;
    width: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    cursor: pointer;
    border-radius: 0.25rem;
    background-color: lightgray;
}

.close-button:hover {
    background-color: darkgray;
}

.show-modal {
    opacity: 1;
    visibility: visible;
    transform: scale(1.0);
    transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
}
/*end view item popup modal*/


@media (min-width: 723px) {


    .modal-content {
 /*   position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem; */
    width: auto;
    
}
}


/*Desktop sizes*-----------------------------------------------------*/

@media (min-width: 1023px) {

    #menuCardWrapper {
    
        flex: 1 1 30%; /*grow | shrink | basis */
    }

    .modalContentWrapper {

    /*  display: flex;
        flex-direction: row;
        width: 100%; */

    
    }
    .modal-content {
   /*   position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem; */
        max-width: 35%;
        
    }

}

</style>
