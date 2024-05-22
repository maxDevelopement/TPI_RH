

function setArrayToSend(array){
    let arrayToSend = []
    array.forEach(element => {
        arrayToSend.push(element.dataValues)
    })
    return arrayToSend
}

module.exports = { 
    setArrayToSend
}