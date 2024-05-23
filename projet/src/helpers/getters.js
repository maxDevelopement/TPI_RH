function checkUserConnexion(){
    console.log("sessionstorage user : ", JSON.parse(sessionStorage.getItem('user')))
    return sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
}
export {
    checkUserConnexion
}
