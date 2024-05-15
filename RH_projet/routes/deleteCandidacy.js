const Candidacy = require('../models/Candidacy')
module.exports = (app) => {
    app.put('/api/deleteCandidacy', async (req, res) => {     
        console.log('reception data : ', req.body)
        try{
            const body = req.body
            const searchedCandidacy = await Candidacy.findOne({where: {idCandidacy: body.idCandidacy}})
            console.log(searchedCandidacy)
            await searchedCandidacy.destroy()
            const msg = `success_deleteCandidacy`
            return res.status(200).send(msg)
        }catch(error){
            const msg = `error_data`
            return res.status(400).send(msg)
        }
    })
}