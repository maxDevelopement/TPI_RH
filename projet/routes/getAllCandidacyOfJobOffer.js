const Candidacy = require('../models/Candidacy')
const { getSpecificJobOffer } = require('../helpers/getters') 
const { setArrayToSend } = require('../helpers/setters')

// Récupère toutes les candidatures pour une offre d'emploi spécifique.
// Retourne les candidatures ou un message approprié en fonction du résultat.
module.exports = (app) => {
    app.get('/api/getAllCandidacyOfJobOffer', async (req, res) => {
        const idJobOffer = req.body.idJobOffer
        try{
            const selectedJobOffer = await getSpecificJobOffer(idJobOffer)
            if(!selectedJobOffer){
                const msg = `error_data`
                return res.status(400).send(msg)
            }
            const allCandidacy = await Candidacy.findAll({ where: {fkJobOffer: selectedJobOffer.idJobOffer}})
                if(!allCandidacy.length){
                    const msg = `success_noData`
                    return res.status(200).send(msg)
                }
                const dataToSend = setArrayToSend(allCandidacy)
                const msg = `success_getAllCandidaciesOfJobOffe`
                return res.status(200).send({
                    msg: msg,
                    data: dataToSend
                })
        }catch(error){
            const msg = `error_data`
            return res.status(400).send(msg)
        }
         
    })
}