const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { getEmployeeByPseudo } = require('../helpers/getters')

// ce endpoint attend 2 parametres : pseudo & password
module.exports = (app) => {
    app.post('/api/login', async (req, res) => {
        //console.log("loginUser enter")
        const pseudo = req.body.pseudo
        const password = req.body.password
        try{
            // requete qui va chercher l'utilisateur (son pseudo)
            let userData = await getEmployeeByPseudo(pseudo)
            if(userData === null){ // si il ne trouve rien 
                const message = "error_pseudo"
                return res.json({msg: message, auth: false}) 
            }
            // si il trouve le user, compare les passwords 
            const isPasswordValid = await bcrypt.compare(password, userData.password)
            // si passwords ne correspondent pas
            if(!isPasswordValid){
                const message = "error_password"
                return res.status(400).send({msg: message, auth: false})
            }
            delete userData.password // suppression du passsword de la réponse
            // si passwords correspondent => user connecté !
            const msg = "success_login"
            const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
            return res.status(200).send({accessToken: accessToken, auth: true, msg: msg, user: userData})
        }catch(error){
            console.error(error)
            const msg = `error_system`
            return res.status(500).send(msg)
        }
    })
}