function checkUserConnexion(){
    console.log("sessions : ", JSON.parse(sessionStorage.getItem('user')))
    console.log("sessions2 : ", sessionStorage.getItem('user'))
    return sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
}
export {
    checkUserConnexion
}
