const Candidacy = require('../models/Candidacy')

// Supprimer une candidature spécifiée par son identifiant.
// Retourne un message de succès si la suppression est effectuée, sinon retourne un message d'erreur
module.exports = (app) => {
    app.put('/api/deleteCandidacy', async (req, res) => {
        try{
            const body = req.body
            const searchedCandidacy = await Candidacy.findOne({where: {idCandidacy: body.idCandidacy}})
            await searchedCandidacy.destroy()
            const msg = `success_deleteCandidacy`
            return res.status(200).send(msg)
        }catch(error){
            const msg = `error_data`
            return res.status(400).send(msg)
        }
    })
}