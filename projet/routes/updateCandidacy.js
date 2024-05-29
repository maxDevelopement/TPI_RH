const Candidacy = require('../models/Candidacy')
const { Sequelize } = require('sequelize')

// Met à jour les informations d'une candidature spécifiée.
// Retourne un message de succès si la mise à jour est effectuée, sinon retourne un message d'erreur.
module.exports = (app) => {
    app.put('/api/updateCandidacy', async (req, res) => {
        const body = req.body
        const searchedCandidacy = await Candidacy.findOne({where: {idCandidacy: body.idCandidacy}})
        if(!searchedCandidacy){
            const msg = `error_data`
            return res.status(400).send(msg)
        }   
        if(body.decision !== 'pending' && body.decision !== 'accepted' && body.decision !== 'refused'){
            return res.status(400).send(`error_data`)
        }
        try{   
            searchedCandidacy.set({
                lastname: body.lastname,
                firstname: body.firstname,
                mail: body.mail,
                phone: body.phone,
                postulationDate: body.postulationDate,
                interviewDate: body.interviewDate,
                decision: body.decision,
            })
            await searchedCandidacy.save()
            const msg = `success_update`
            return res.status(200).send(msg)
        }catch(error){
            if (error instanceof Sequelize.UniqueConstraintError) {
                const msg = 'unicity_error'
                return res.status(400).send(msg)
            }else{
                const msg = `system_error`
                return res.status(500).send(msg)
            }
        }   
    })
}