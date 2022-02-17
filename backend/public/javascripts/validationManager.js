exports.validateDeliveryAddress = (deliveryAddress) => {


    // validate the address is in salem, mo , usa
    console.log(deliveryAddress)
    if(deliveryAddress.state.toUpperCase() != "MO" ||
    deliveryAddress.city.toUpperCase() != "SALEM") {

        return(false);
    };
    return(true);
};