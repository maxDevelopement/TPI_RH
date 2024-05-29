const JobOffer = require('../models/Joboffer')

// Récupère toutes les offres d'emploi dont le statut est "pending".
// Retourne les offres d'emploi ou un message approprié en fonction du résultat.
module.exports = (app) => {
    app.get('/api/getAllJobOffer', async (req, res) => {
        let dataToSend = []
        try{
            const allJobOfferDatas = await JobOffer.findAll()
            allJobOfferDatas.forEach(jobOffer => {
                if(jobOffer.dataValues.status === 'pending'){ // check si offre toujours en attentes
                    dataToSend.push({
                        idJobOffer: jobOffer.dataValues.idJobOffer,
                        name: jobOffer.dataValues.name,
                        place: jobOffer.dataValues.place,
                        status: jobOffer.dataValues.status,
                        rate: jobOffer.dataValues.rate
                    })
                }
            })
            const msg = `success_getAllJobOffer`
            return res.status(200).send({ msg: msg, data: dataToSend })
        }catch(error){
            const msg = `error_getAllEmployee`
            return res.status(500).send(msg)
        }
    })
}