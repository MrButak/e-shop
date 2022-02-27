<template>

<h2 class="pageTitle">Menu</h2>
<div class="menuCardWrapperDesktop">
    <div id="menuCardWrapperMain">
        
        <div v-for="item in this.menuItems" id="menuCardWrapper" :data-item="item['id']">
            
            <img class="menuItemImg" :src="item['imageUrl']"/> 
            <h3 class="menuItemName">{{ item['name'] }}</h3>
            
            <!-- show message if out of stock -->
            <!-- TODO: add a class list to out of stock items which will dim the backgound color and make 'out of stock' more obvious -->
            <p v-if="item['quantity'] < 1">Out of stock</p>

            <div class="menuItemBtnWrapper">
                <p class="menuPrice"> price: ${{ item['price'] }}</p>
                <!-- click function will set global view item (this.currentItemView) and trigger modal popup -->
                <span @click="this.setViewItem">
                    <button @click="this.toggleModal" class="trigger viewItemBtn">View Item</button>
                </span>
            </div>
        </div>
        
    </div>
</div>

<div class="modal">
    
    <div class="modal-content">
        <div class="modalContentWrapper">
            <span @click="this.toggleModal" class="close-button">&times;</span>
            <div class="desktopModalImgTitle">
                <img :src="this.currentItemView['imageUrl']"/>
                <h3 class="modalMenuItemName">{{ this.currentItemView['name'] }}</h3>
            </div>
            <p>{{ this.currentItemView['description'] }}</p>
            
            <div class="desktopModalBtnsWrapper">
                <div class="modalPriceQtyWrapper">
                    <p>Price: ${{ this.currentItemView['price'] }}</p>
                    <!-- show message if out of stock -->
                    <p v-if="this.currentItemView['quantity'] > 0">in stock: {{ this.currentItemView['quantity'] }}</p>
                    <p v-else>Out of stock</p>
                </div>
                <Addtocartbtn ref="addToCartBtn" />
            </div>
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

    mounted() {

        this.checkForMenuItems();
        this.setViewModal();
    },

    methods: {

        // Function checks if global state object menuItems has been assigned variables from the database yet
        checkForMenuItems() {

            if(this.menuItems === 0) {

                // I initially set the global state of menuItems to 0 (statestore/composition.js) because setting to null was causing an issue
                this.getMenuItems();
                return;
            };

            return;
        },

        // function queries database for menu items if the global state object this.menuItems hasn't been assigned yet
        //      that way there is only 1 db call per page load
        async getMenuItems() {

            let response = await axios({
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: 'http://127.0.0.1:3000/getmenu',
                data: null
            })
                
            // set global state of menuItems object if it hasn't already been set
            this.menuItems = {};
            let tmpCounter = 1;
            response.data.forEach((item) => {
                this.menuItems[`item-${tmpCounter}`] = item;
                // add a buyQuantity property to the object
                this.menuItems[`item-${tmpCounter}`].buyQuantity = 0;
                tmpCounter++;
            });
        
            return;
        },

        // Function will set the global state currentItemView and make it available to the popup view item modal
        setViewItem(event) {

            // I get the item id from a data-set attribute added to the html element
            let menuItemNum = event.path[3].dataset.item;
            this.currentItemView = this.menuItems[`item-${menuItemNum}`];
            // set the text input for buy quantity
            this.currentItemView['buyQtyInput'] = 1;
        },

        //
        // Functions handle the 'view item' popup modal
        //
        setViewModal() {

            this.modal = document.querySelector(".modal");
            this.trigger = document.querySelector(".trigger");
            this.closeButton = document.querySelector(".close-button");

            // click outside of modal to hide
            window.addEventListener("click", this.windowOnClick); 
        },

        toggleModal() {

            this.modal.classList.toggle("show-modal");
        },

        // Function will hide modal if area outside of modal is clicked
        windowOnClick(event) {

            if (event.target === this.modal) {
                this.toggleModal();
            }
        },
   
    },
})



</script>

<style scoped>

/*start menu items display*/
.menuTitle {
    text-align: center;
    font-weight: 800;
    padding: 50px 0 0 0;
}
#menuCardWrapperMain {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding: 10px;
    gap: 30px; 
}
#menuCardWrapper {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    flex: .8 1 40%; /*grow | shrink | basis */
   /* gap: 10px;*/
    min-height: 100%;
    border-radius: 7px;
   /* padding-bottom: 1rem;*/
    
    -webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.36); 
    box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.20);
}
.menuItemImg {
    border-radius: 0 0 0 30px;
    margin-bottom: -1rem;
    z-index: 1;
}
.menuItemName {
    text-align: center;
    font-weight: 600;
    background-color: #feecea;
    border-bottom: .3px solid #f8cdc9;
    padding: 2rem 0 1rem;
}
.menuPrice {
    text-align: center;
}
.menuItemBtnWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    margin-top: auto;
    width: 100%;
    padding: .7rem 0;
    gap: 1.2rem
}
.viewItemBtn {
    background-color: #1980b6;
    color: #ffffff;
    border-color: #1980b6;
    padding: .2rem;
}
/*end menu items*/

/*start view item popup modal*/
.modal {
    z-index: 2;
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
.modalMenuItemName {
    text-align: center;
    font-weight: 600;
   
}
.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 1rem;
    max-width: 93%;
    border-radius: 0.5rem;
    border: 1px solid black;
   /* height: inherit; */
    overflow: scroll;
}

.close-button {
    display: none;
}


.show-modal {
    opacity: 1;
    visibility: visible;
    transform: scale(1.0);
    transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
}
.desktopModalBtnsWrapper {
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
/*end view item popup modal*/


/*Tablet sizes*-----------------------------------------------------*/
@media (min-width: 723px) {


    .modal-content {
    /*   position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem; */
        
    
    }
}


/*Desktop sizes*-----------------------------------------------------*/

@media (min-width: 1023px) {

    .menuCardWrapperDesktop {

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;

    }
    #menuCardWrapperMain {
        gap: 50px;
        width: 80%;
    }
    #menuCardWrapper {
        
       
        flex: 1 1 30%;/*grow | shrink | basis */
     
        
    }

        /*start view item popup modal*/
    .modal {
        z-index: 2;
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
        flex-direction: row;
        width: 100%;
        gap: 12px;
    }
    .ModalMenuItemName {
        text-align: center;
        font-weight: 600;
    
    }
    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 1rem;
        width: 80%;
        border-radius: 0.5rem;
        border: 1px solid black;
        
        
    }

    .close-button {
        display: block;
    }


    .show-modal {
        opacity: 1;
        visibility: visible;
        transform: scale(1.0);
        transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
    }
    .desktopModalImgTitle {
        
    }
    .desktopModalBtnsWrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 60%;
    
    }
    .modalPriceQtyWrapper {

        display: flex;
        justify-content: space-around;
        
    }
    /*end view item popup modal*/
}

</style>
