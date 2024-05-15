const Candidacy = require('../models/Candidacy')
const { getSpecificJobOffer } = require('../helpers/getters') 
const { setArrayToSend } = require('../helpers/setters')

module.exports = (app) => {
    app.get('/api/getAllCandidacyOfJobOffer', async (req, res) => {
        const idJobOffer = req.body.idJobOffer
        let dataToSend = []
        console.log("reception requete : ", idJobOffer)
        try{
            const selectedJobOffer = await getSpecificJobOffer(idJobOffer)
            if(selectedJobOffer){
                console.log("job : ", selectedJobOffer)
                const allCandidacy = await Candidacy.findAll({ where: {fkJobOffer: selectedJobOffer.idJobOffer}})
                if(allCandidacy === []){
                    const msg = `error_nodata`
                    return res.status(500).send(msg)
                }
                const dataToSend = setArrayToSend(allCandidacy)
                const msg = `succes_getAllEvaluationOfEmployee`
                return res.status(200).send({
                    msg: msg,
                    data: dataToSend
                })
            }
        }catch(error){
            const msg = `error_getAllEvaluationOfEmployee`
            return res.status(400).send(msg)
        }
         
    })
}