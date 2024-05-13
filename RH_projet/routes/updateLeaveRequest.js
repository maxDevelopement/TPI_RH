const LeaveRequest = require('../models/Leaverequest')
const { checkStatusAndExistLeaveRequest } = require('../helpers/checks')

module.exports = (app) => {
    app.put('/api/updateLeaveRequest', async (req, res) => {
        console.log('reception requete')
        const body = req.body
        const leaveReqCheck = await LeaveRequest.findOne({ where: {idLeaveRequest: idLeaveRequest} })
        if(leaveReqCheck && leaveReqCheck.status === 'pending'){
            leaveRequest.set({
                status: body.status
            })
            await leaveRequest.save()
            const msg = `success_updateLeaveRequest`
            return res.status(200).send(msg)
        }else{
            return false
        }
    })
}