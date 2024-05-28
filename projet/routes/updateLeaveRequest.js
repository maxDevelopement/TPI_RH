const LeaveRequest = require('../models/Leaverequest')

module.exports = (app) => {
    app.put('/api/updateLeaveRequest', async (req, res) => {
        try{            
            const body = req.body
            console.log('reception requete : ', typeof(body.status))
            if(body.status !== 'accepted' && body.status !== 'refused' && body.status !== 'pending'){
                console.log("here : ", body.status)
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
            console.log(error)
            const msg = `error_system`
            return res.status(500).send(msg)
        }
    })
}