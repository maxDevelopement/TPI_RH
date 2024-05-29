const Evaluation = require('../models/Evaluation')
const { getEmployeeById } = require('../helpers/getters') 
const { setArrayToSend } = require('../helpers/setters')

// Récupère toutes les évaluations d'un employé pour un contrat spécifique.
// Retourne les évaluations ou un message approprié en fonction du résultat.
module.exports = (app) => {
    app.get('/api/getAllEvaluationOfEmployee', async (req, res) => {
        const idContract = req.body.idContract
        try{
            const allEvaluation = await Evaluation.findAll({ where: {fkContract: idContract}})
            if(allEvaluation.length === 0){
                return res.status(400).send(`error_data`)
            }
            const dataToSend = setArrayToSend(allEvaluation)
            const msg = `succes_getAllEvaluationOfEmployee`
            return res.status(200).send({
                msg: msg,
                data: dataToSend
            })
        }catch(error){
            console.log(error)
            const msg = `error_system`
            return res.status(500).send(msg)
        }       
    })
}