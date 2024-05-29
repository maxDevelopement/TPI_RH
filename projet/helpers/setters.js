const crypto =require('crypto')
const Historic = require('../models/Historic');
const Evaluation = require('../models/Evaluation');
const LeaveRequest = require('../models/Leaverequest');

function setRandomPassword() {
    return crypto.randomBytes(12).toString('base64').slice(0, 12);
}
// filtre et ne laisse que le tableau "dataValues" d'un objet de réponse à un query
// Retourne un tableau
function setArrayToSend(array){
    let arrayToSend = []
    array.forEach(element => {
        arrayToSend.push(element.dataValues)
    })
    return arrayToSend
}
// boucle qui sert à supprimer plusieurs record des tables "leaveRequests" et "Evaluations"
// ne retourne rien
async function deleteArray(array){
    const promises = array.map(async (item) => {
        if(item.idEvaluation){
            await deleteEvaluationItem(item)
        }else if(item.idLeaveRequest){
            await deleteLeaveRequestItem(item)
        }
    });
    await Promise.all(promises);
}
async function deleteEvaluationItem(item){
    const evalToDestroy = await Evaluation.findOne({where: {idEvaluation: item.idEvaluation}})
    await evalToDestroy.destroy();
}
async function deleteLeaveRequestItem(item){
    const lrToDestroy = await LeaveRequest.findOne({where: {idLeaveRequest: item.idLeaveRequest}})
    if(lrToDestroy){
        await lrToDestroy.destroy();
    }
}
// Sauvegarde les données d'un contrat dans la table "Historics" selon une date de fin donnée
// retourne null en cas d'erreur 
async function backupContractInHistorics(idEmployee, endDate, contract){
    console.log("try backup !")
    try{
        insertHistoric = await Historic.create({
            fkEmployee: idEmployee,
            service: contract.service,
            startDate: contract.startDate,
            endDate: endDate,
            rate: contract.rate,
            job: contract.job,
            salary: contract.salary,
            email: contract.email,
            phone: contract.phone
        })
        console.log("insert :", insertHistoric)
        return insertHistoric
    }catch(error){
        console.log(error)
        return null
    }
}

module.exports = {
    setRandomPassword, 
    setArrayToSend,
    deleteArray,
    backupContractInHistorics
}