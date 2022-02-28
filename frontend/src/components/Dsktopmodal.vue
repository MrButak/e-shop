<template>



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


import { defineComponent } from 'vue';
import { globalState } from '../statestore/composition';
import Addtocartbtn from '../components/Addtocartbtn';

export default defineComponent({

    name: "Dsktopmodal",
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

        this.setViewModal();
    },

    methods: {

       
        //
        // Functions handle the 'view item' popup modal
        //
        setDsktopViewModal() {

            this.modal = document.querySelector(".modal");
            this.trigger = document.querySelector(".trigger");
            this.closeButton = document.querySelector(".close-button");

            // click outside of modal to hide
            window.addEventListener("click", this.windowOnClick); 
        },

        dsktopToggleModal() {

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




/*Desktop sizes*-----------------------------------------------------*/

@media (min-width: 1023px) {


    
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
