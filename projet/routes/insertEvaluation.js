const Evaluation = require('../models/Evaluation')

module.exports = (app) => {
    app.put('/api/insertEvaluation', async (req, res) => {
       console.log("recpetion requete")
        const body = req.body   
        const insertEvaluation = await Evaluation.create({
            evaluationDate: body.evaluationYear,
            performanceNote: body.performanceNote,
            positiv: body.positiv,
            negativ: body.negativ,
            fkContract: body.fkContract
        })
        return res.status(200).send(`success_insertEvaluation`)            
   })
}

