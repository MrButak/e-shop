exports.validateDeliveryAddress = (deliveryAddress) => {


    // validate the address is in salem, mo , usa
    // TODO: can also validate postal code as well
    if(deliveryAddress.state.toUpperCase() != "MO" ||
    deliveryAddress.city.toUpperCase() != "SALEM") {

        return(false);
    };
    return(true);
};

exports.validateEmail = (email) => {

    let reExEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return(reExEmail.test(email));
    
};