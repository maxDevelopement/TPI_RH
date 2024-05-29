const LeaveRequest = require('../models/Leaverequest')
const { checkValidityLeaveRequest } = require('../helpers/checks')

// Insère une nouvelle demande de congé pour un contrat spécifié.
// Retourne un message de succès si l'insertion est effectuée, sinon retourne un message d'erreur
module.exports = (app) => {
    app.put('/api/insertLeaveRequest', async (req, res) => {
        try{
            const body = req.body
            const isValid = await checkValidityLeaveRequest(body.fkContract, body.startDate)
            if(isValid){
                try{
                    const insertLeaveRequest = await LeaveRequest.create({
                        fkContract: body.fkContract,
                        startDate: body.startDate,
                        endDate: body.endDate,
                        reason: body.reason,
                        payed: body.payed
                    })
                    const msg = `success_insertLeaveRequest`
                    return res.status(200).send(msg)
                }catch(error){
                    const msg = `error_data`
                    return res.status(400).send(msg)
                }
            }else{
                return res.status(400).send(`error_unicity`)
            } 
        }catch(error){
            return res.status(400).send(`error : ${error}`)
        }
    })
}

