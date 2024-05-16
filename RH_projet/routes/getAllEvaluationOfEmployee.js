const Evaluation = require('../models/Evaluation')
const { getEmployeeById } = require('../helpers/getters') 
const { setArrayToSend } = require('../helpers/setters')

module.exports = (app) => {
    app.get('/api/getAllEvaluationOfEmployee', async (req, res) => {
        const idEmployee = req.body.idEmployee
        let dataToSend = []
        try{
            const selectedEmployee = await getEmployeeById(idEmployee)
            if(selectedEmployee){
                console.log("employé : ", selectedEmployee)
                const allEvaluation = await Evaluation.findAll({ where: {fkContract: selectedEmployee.idEmployee}})
                const dataToSend = setArrayToSend(allEvaluation)
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