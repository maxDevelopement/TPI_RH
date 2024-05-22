const LeaveRequest = require('../models/Leaverequest')
const { checkValidityLeaveRequest } = require('../helpers/checks')
module.exports = (app) => {
    app.put('/api/insertLeaveRequest', async (req, res) => {
       console.log("recpetion requete")
        const body = req.body
        if(await checkValidityLeaveRequest(body.fkContract, body.startDate)){
            const insertLeaveRequest = await LeaveRequest.create({
                fkContract: body.fkContract,
                startDate: body.startDate,
                endDate: body.endDate,
                reason: body.reason,
                payed: body.payed,
            })
            const msg = `success_insertLeaveRequest`
            return res.status(200).send(msg)
        }else{
            return res.status(400).send(`une demande de congé similaire a dejà été remise de votre part`)
        }
    })
}

