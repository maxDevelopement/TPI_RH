const { sequelize, dataTypes } = require('./sequelize')

async function init(){
    try{
        await sequelize.authenticate()
        console.log('connexion to db successfull')
    }catch(error){
        console.log(`unable to connect to the db : ${error}`)
    }
}

module.exports = init
