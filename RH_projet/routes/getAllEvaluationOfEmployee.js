const Evaluation = require('../models/Evaluation')
const { getSpecificEmployee } = require('../helpers/getters') 

module.exports = (app) => {
    app.get('/api/getAllEvaluationOfEmployee', async (req, res) => {
        const idEmployee = req.body.idEmployee
        let dataToSend = []
        try{
            const selectedEmployee = await getSpecificEmployee(idEmployee)
            if(selectedEmployee){
                console.log("employé : ", selectedEmployee)
                const allEvaluation = await Evaluation.findAll({ where: {fkContract: selectedEmployee.idEmployee}})
                //console.log(allEvaluation)
                allEvaluation.forEach(evaluation => {
                    const eval = {
                        idEvaluation: evaluation.dataValues.idEvaluation,
                        evaluationDate: evaluation.dataValues.evaluationDate,
                        performanceNote: evaluation.dataValues.performanceNote,
                        positiv: evaluation.dataValues.positiv,
                        negativ: evaluation.dataValues.negativ
                    }
                    dataToSend.push(eval)
                })
                console.log(dataToSend)
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