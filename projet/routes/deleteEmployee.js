const { getEmployeeById, getContractOfEmployee, getAllLeaveRequestsOfContract, getAllEvaluationOfEmployee } = require('../helpers/getters')
const { deleteArray, backupContractInHistorics } = require('../helpers/setters')

// ce endpoint ne fonctionne que partiellement
// Cette route permet de supprimer un employé spécifié par son identifiant.
// Retourne un message de succès si la suppression est effectuée, sinon retourne un message d'erreur.
module.exports = (app) => {
    app.put('/api/deleteEmployee', async (req, res) => {  
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
            await backupContractInHistorics(searchedEmployee.dataValues.idEmployee, endDate, searchedContract.dataValues) // ne fonctionne pas
            if(searchedLeaveRequests && searchedLeaveRequests.length > 0){
                await deleteArray(searchedLeaveRequests) // suppression demandes de congés
            }
            if(searchedEvaluations && searchedEvaluations.length > 0){
                await deleteArray(searchedEvaluations) // suppression des evaluations
            }
            await searchedContract.destroy() // suppression du contrat
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