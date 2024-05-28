const { getEmployeeById, getContractOfEmployee, getAllLeaveRequestsOfContract, getAllEvaluationOfEmployee } = require('../helpers/getters')
const { deleteArray, backupContractInHistorics } = require('../helpers/setters')

module.exports = (app) => {
    app.put('/api/deleteEmployee', async (req, res) => {  
        console.log("delete employee !")
        const idEmployee = req.body.idEmployee
        const idContract = req.body.idContract
        let endDate = req.body.endDate
        const searchedEmployee = await getEmployeeById(idEmployee)
        const searchedContract = await getContractOfEmployee(idEmployee)
        console.log("employee : ", searchedEmployee.dataValues)
        if(searchedEmployee === null || searchedContract === null){
            const msg = `error_data`
            return res.status(400).send(msg)
        }
        if(!endDate){
            endDate = new Date().toJSON().slice(0, 10) // date du jour
        }
        try{
            const searchedLeaveRequests = await getAllLeaveRequestsOfContract(idContract)
            const searchedEvaluations = await getAllEvaluationOfEmployee(idContract)
            console.log("data eval : ", searchedEvaluations)
            const backup = await backupContractInHistorics(searchedEmployee.dataValues.idEmployee, endDate, searchedContract.dataValues)
            console.log("backup : ", backup)
            if(searchedLeaveRequests && searchedLeaveRequests.length > 0){
                await deleteArray(searchedLeaveRequests)
                console.log("LRs deleted")
            }
            if(searchedEvaluations && searchedEvaluations.length > 0){
                await deleteArray(searchedEvaluations)
                console.log("evals deleted")
            }
            await searchedContract.destroy()
            searchedEmployee.activ =  false
            searchedEmployee.save()
            const msg = `success_deleteEmployee`
            return res.status(200).send(msg)
        }catch(error){
            console.log(error)
            const msg = `error_system`
            return res.status(500).send(msg)
        }
        
    })
}