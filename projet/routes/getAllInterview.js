const Candidacy = require('../models/Candidacy')
const { Op } = require('sequelize')
const { setArrayToSend } = require('../helpers/setters')

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
            if(allInterviewsDatas === []){
                const msg = `error_nodata`
                return res.status(500).send(msg)
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