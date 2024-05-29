const Candidacy = require('../models/Candidacy')
const { Op } = require('sequelize')
const { setArrayToSend } = require('../helpers/setters')

// Récupère toutes les dates d'entretien pour les candidatures avec comme valeurs de decision : "pending"
// Retourne les dates d'entretien ou un message approprié en fonction du résultat.
module.exports = (app) => {
    app.get('/api/getAllInterviewDate', async (req, res) => {
        try{
            const allInterviewsDatas = await Candidacy.findAll(
                {
                    where: {
                        [Op.and]: [{decision: 'pending'}, {interviewDate: {[Op.ne]: null}}]
                    }
                }
            )
            if(allInterviewsDatas.length === 0){
                const msg = `success_nodata`
                return res.status(200).send(msg)
            }        
            const arrayToSend = setArrayToSend(allInterviewsDatas)
            const msg = `success_getAllInterviewDate`
            return res.status(200).send({msg: msg, data: arrayToSend})
        }catch(error){
            const msg = `error_system`
            return res.status(500).send(msg)
        }
        
    })
}