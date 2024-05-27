const { Sequelize } = require('sequelize')
const Candidacy = require('../models/Candidacy')
const { checkValidityJobOffer, checkValidityCandidacy } = require('../helpers/checks')

module.exports = (app) => {
    app.put('/api/insertCandidacy', async (req, res) => {
        const body = req.body
        const validityJobOfferCheck = await checkValidityJobOffer(body.fkJobOffer)
        const validityCandidacyCheck = await checkValidityCandidacy(body.fkJobOffer, body.mail, body.phone)
        if(!validityJobOfferCheck){
            const msg = `error_data`
            return res.status(400).send(msg)
        }
        if(validityCandidacyCheck){
            try{
                const insertCandidacy = await Candidacy.create({
                    fkJobOffer: body.fkJobOffer,
                    lastname: body.lastname,
                    firstname: body.firstname,
                    mail: body.mail,
                    phone: body.phone,
                    postulationDate: body.postulationDate,
                })
                if(!insertCandidacy){
                    const msg = 'error_system'
                    return res.status(500).send(msg)
                }
                const msg = 'success_insertCandidacy'
                return res.status(200).send(msg)
            }
            // gestion erreurs contraintes unicité pour champs : mail, phone
            catch(error){ 
                console.log(error)
            }
        }else{
            const msg = `unicity_error`
            return res.status(400).send(msg)
        }
    })
}