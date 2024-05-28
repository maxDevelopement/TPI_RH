const LeaveRequest = require('../models/Leaverequest')
const { checkValidityLeaveRequest } = require('../helpers/checks')
module.exports = (app) => {
    app.put('/api/insertLeaveRequest', async (req, res) => {
        try{

            console.log("recpetion requete")
            const body = req.body
            const isValid = await checkValidityLeaveRequest(body.fkContract, body.startDate)
            if(isValid){
                console.log("here")
                try{
                    const insertLeaveRequest = await LeaveRequest.create({
                        fkContract: body.fkContract,
                        startDate: body.startDate,
                        endDate: body.endDate,
                        reason: body.reason,
                        payed: body.payed
                    })
                    console.log("insertLeaveRequest : ", insertLeaveRequest)
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
            return res.send(`eoor : ${error}`)
        }
    })
}

