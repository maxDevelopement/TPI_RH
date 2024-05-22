const JobOffer = require('../models/Joboffer')

module.exports = (app) => {
    app.get('/api/getAllJobOffer', async (req, res) => {
        let dataToSend = []
        try{
            const allJobOfferDatas = await JobOffer.findAll()
            allJobOfferDatas.forEach(jobOffer => {
                if(jobOffer.dataValues.status === 'pending'){ // check si offre toujours en attentes
                    console.log("yes ! : ", jobOffer.dataValues)
                    dataToSend.push({
                        idJobOffer: jobOffer.dataValues.idJobOffer,
                        name: jobOffer.dataValues.name,
                        place: jobOffer.dataValues.place,
                        status: jobOffer.dataValues.status,
                        rate: jobOffer.dataValues.rate
                    })
                    console.log("data to send : ", dataToSend)
                }
            })
            console.log("data to send : ", dataToSend)
            const msg = `success_getAllJobOffer`
            return res.status(200).send({ msg: msg, data: dataToSend })
        }catch(error){
            const msg = `error_getAllEmployee`
            return res.status(500).send(msg)
        }
    })
}