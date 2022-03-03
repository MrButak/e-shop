<template>



    <div class="dsktopModal">
        
        <div class="dsktopModal-content">
            <div class="modalContentWrapper">
             <!---   <span @click="this.dsktopToggleModal" class="dsktopCloseBtn">&times;</span> -->
                <div class="dsktopModalImgWrapper">
                    <img :src="this.currentItemView['image_url']"/>
                </div>
                <div class="desktopModalTitleAndDes">
                    <div class="modalMenuItemNameWrapper">
                        <h3 class="modalMenuItemName">{{ this.currentItemView['name'] }}</h3>
                    </div>
                    <p>{{ this.currentItemView['description'] }}</p>
                </div>
                
                <div class="desktopModalBtnsWrapper">
                    <div class="dsktopModalPriceQtyWrapper">
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

            dsktopModal: null,
            dsktopTrigger: null,
            closeButton: null
        }
    },

    // mounted() {

    //     this.setDsktopViewModal();
    // },

    methods: {

       
        //
        // Functions handle the 'view item' popup dsktopModal
        //
        setDsktopViewModal() {

            this.dsktopModal = document.querySelector(".dsktopModal");
            this.dsktopTrigger = document.querySelector(".dsktopTrigger");
            this.closeButton = document.querySelector(".dsktopCloseBtn");

            // click outside of dsktopModal to hide
            window.addEventListener("click", this.dsktopWindowOnClick); 
        },

        dsktopToggleModal() {

            this.dsktopModal.classList.toggle("show-dsktopModal");
        },

        // Function will hide dsktopModal if area outside of dsktopModal is clicked
        dsktopWindowOnClick(event) {

            if (event.target === this.dsktopModal) {
                this.dsktopToggleModal();
            }
        },
   
    },
})



</script>

<style scoped>

/*Desktop sizes*-----------------------------------------------------*/

@media (min-width: 1023px) {

    .dsktopModal {
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
        justify-content: space-between;
        width: 100%;
        
    }
    .dsktopModalImgWrapper {
        display: flex;
        max-height: auto;
        height: auto;
        justify-content: center;
        align-items: center;
    }
    .modalMenuItemNameWrapper {
        padding: 0 0 10px 0;
    }
    .modalMenuItemName {
        text-align: center;
        font-weight: 600;
    
    }
    .dsktopModal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 1rem;
        width: 80%;
     /*   border-radius: 0.5rem;*/
        border: 1px solid black; 
    }

    .dsktopCloseBtn {
        display: block;
    }


    .show-dsktopModal {
        opacity: 1;
        visibility: visible;
        transform: scale(1.0);
        transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
    }
    .desktopModalTitleAndDes {
        display: flex;
        flex-direction: column;
        width: 33.3%;
        
    }
    .desktopModalBtnsWrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        align-items: center;
        gap: 1rem;
    
    }
    .dsktopModalPriceQtyWrapper {

        display: flex;
        justify-content: space-around;
        text-align: center;
        
        
        flex-direction: column-reverse;
        
    }
    /*end view item popup dsktopModal*/
}

</style>
