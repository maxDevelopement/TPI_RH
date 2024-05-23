const { Sequelize } = require('sequelize')
const Candidacy = require('../models/Candidacy')
const { checkValidityJobOffer, checkValidityCandidacy } = require('../helpers/checks')

module.exports = (app) => {
    app.put('/api/insertCandidacy', async (req, res) => {
       console.log("recpetion requete")
        const body = req.body
        console.log("fk job : ", body.fkJobOffer)
        const validityJobOfferCheck = await checkValidityJobOffer(body.fkJobOffer)
        const validityCandidacyCheck = await checkValidityCandidacy(body.fkJobOffer, body.mail, body.phone)
        console.log("validityCheck : ", validityCandidacyCheck)
        if(validityCandidacyCheck && validityJobOfferCheck){
            try{
                const insertCandidacy = await Candidacy.create({
                    fkJobOffer: body.fkJobOffer,
                    lastname: body.lastname,
                    firstname: body.firstname,
                    mail: body.mail,
                    phone: body.phone,
                    postulationDate: body.postulationDate,
                })
                if(insertCandidacy){
                    const msg = 'success_insertCandidacy'
                    return res.status(200).send(msg)
                }
            }
            // gestion erreurs contraintes unicité pour champs : mail, phone
            catch(error){ 
                console.log(error)
               /* if (error instanceof Sequelize.UniqueConstraintError) {
                    const msg = 'unicity_error'
                    return res.status(400).send(msg)
                }else{
                    const msg = `system_error`
                    return res.status(500).send(msg)
                }*/
            }
            console.log("la candidature a été gérée !")
        }else{
            const msg = `unicity_error`
            return res.status(400).send(msg)
        }
    })
}