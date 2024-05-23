const Evaluation = require('../models/Evaluation')

module.exports = (app) => {
    app.put('/api/insertEvaluation', async (req, res) => {
       console.log("recpetion requete")
       try{
            const body = req.body   
            const insertEvaluation = await Evaluation.create({
            fkContract: body.fkContract,
            evaluationYear: body.evaluationYear,
            performanceNote: body.performanceNote,
            positiv: body.positiv,
            negativ: body.negativ,
        })
       }catch(error){
        return res.status(400).send('error_')
       }
        
        return res.status(200).send(`success_insertEvaluation`)            
   })
}

