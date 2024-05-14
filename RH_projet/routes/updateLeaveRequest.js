const LeaveRequest = require('../models/Leaverequest')

module.exports = (app) => {
    app.put('/api/updateLeaveRequest', async (req, res) => {
        console.log('reception requete')
        const body = req.body
        const leaveReqCheck = await LeaveRequest.findOne({ where: {idLeaveRequest: body.idLeaveRequest} })
        console.log(leaveReqCheck.dataValues)
        if(leaveReqCheck && leaveReqCheck.status === 'pending'){
            console.log("leaveReq exist and is pending")
            leaveReqCheck.set({
                status: body.status
            })
            await leaveReqCheck.save()
            const msg = `success_updateLeaveRequest`
            return res.status(200).send(msg)
        }else{
            const msg = `error_data`
            return res.status(400).send(msg)
        }
    })
}