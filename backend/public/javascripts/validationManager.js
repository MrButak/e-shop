exports.validateDeliveryAddress = (deliveryAddress) => {

    console.log(deliveryAddress)
    if(deliveryAddress.state.toUpperCase() != "MO" ||
    deliveryAddress.city.toUpperCase() != "SALEM") {

        return(false);
    };
    return(true);
};