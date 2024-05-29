const LeaveRequest = require('../models/Leaverequest')

// Met à jour le statut d'une demande de congé spécifiée.
// Retourne un message de succès si la mise à jour est effectuée, sinon retourne un message d'erreur.
module.exports = (app) => {
    app.put('/api/updateLeaveRequest', async (req, res) => {
        try{            
            const body = req.body
            if(body.status !== 'accepted' && body.status !== 'refused' && body.status !== 'pending'){
                const msg = `error_data`
                return res.status(400).send(msg)
            }
            const leaveReqCheck = await LeaveRequest.findOne({ where: {idLeaveRequest: body.idLeaveRequest} })
            leaveReqCheck.set({
                status: body.status
            })
            await leaveReqCheck.save()
            const msg = `success_updateLeaveRequest`
            return res.status(200).send(msg)
        }catch(error){
            const msg = `error_system`
            return res.status(500).send(msg)
        }
    })
}