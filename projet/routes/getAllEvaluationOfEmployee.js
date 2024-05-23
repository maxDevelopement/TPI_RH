const Evaluation = require('../models/Evaluation')
const { getEmployeeById } = require('../helpers/getters') 
const { setArrayToSend } = require('../helpers/setters')

module.exports = (app) => {
    app.get('/api/getAllEvaluationOfEmployee', async (req, res) => {
        const idContract = req.body.idContract
        let dataToSend = []
        try{
            const allEvaluation = await Evaluation.findAll({ where: {fkContract: idContract}})
            console.log(allEvaluation)
            const dataToSend = setArrayToSend(allEvaluation)
            const msg = `succes_getAllEvaluationOfEmployee`
            return res.status(200).send({
                msg: msg,
                data: dataToSend
            })
        }catch(error){
            console.log(error)
            const msg = `error_getAllEvaluationOfEmployee`
            return res.status(400).send(msg)
        }
         
    })
}