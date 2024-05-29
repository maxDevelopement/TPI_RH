const Evaluation = require('../models/Evaluation')
const { checkEvaluationyear } = require('../helpers/checks')

// Insère une nouvelle évaluation pour un contrat spécifié.
// Retourne un message de succès si l'insertion est effectuée, sinon retourne un message d'erreur
module.exports = (app) => {
    app.put('/api/insertEvaluation', async (req, res) => {
       try{
            const body = req.body 
            const evaluationYearExist = await checkEvaluationyear(body.fkContract, body.evaluationYear)
            console.log(evaluationYearExist)
            if(evaluationYearExist){
                const msg = `error_unicity`
                return res.status(400).send(msg)
            }
            try{
                const insertEvaluation = await Evaluation.create({
                    fkContract: body.fkContract,
                    evaluationYear: body.evaluationYear,
                    performanceNote: body.performanceNote,
                    positiv: body.positiv,
                    negativ: body.negativ,
                })                
                return res.status(200).send(`success_insertEvaluation`)  
            }catch(error){
                console.log(error)
                const msg = `error_system`
                return res.status(500).send(msg)
            }
       }catch(error){
            return res.status(500).send('error_system')
       }          
   })
}