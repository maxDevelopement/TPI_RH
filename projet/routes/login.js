const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { getEmployeeByPseudo } = require('../helpers/getters')

// ce endpoint attend 2 parametres : pseudo & password
module.exports = (app) => {
    app.post('/api/login', async (req, res) => {
        console.log("login")
        const pseudo = req.body.pseudo
        const password = req.body.password
        try{
            // requete qui va chercher l'utilisateur (son pseudo)
            let userData = await getEmployeeByPseudo(pseudo)
            console.log("userdata0 : ", userData)
            if(userData === null){ // si il ne trouve rien 
                const msg = "error_data"
                return res.status(400).send({msg: msg}) 
            }
            // si il trouve le user, compare les passwords 
            const isPasswordValid = await bcrypt.compare(password, userData.employee.password)
            console.log("check password : ", isPasswordValid)
            // si passwords ne correspondent pas
            if(!isPasswordValid){
                const msg = "error_data"
                return res.status(400).send({msg: msg})
            }
            delete userData.employee.password // suppression du passsword de la réponse
            delete userData.contract.fkEmployee
            console.log("userData1 : ", userData)
            // si passwords correspondent => user connecté !
            const msg = "success_login"
            const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
            return res.status(200).send({accessToken: accessToken, msg: msg, data: userData})
        }catch(error){
            console.error(error)
            const msg = `error_system`
            return res.status(500).send(msg)
        }
    })

}