const crypto =require('crypto')
const Historic = require('../models/Historic');
const Evaluation = require('../models/Evaluation');
const LeaveRequest = require('../models/Leaverequest');

function setRandomPassword() {
    return crypto.randomBytes(12).toString('base64').slice(0, 12);
}

function setArrayToSend(array){
    let arrayToSend = []
    array.forEach(element => {
        arrayToSend.push(element.dataValues)
    })
    return arrayToSend
}

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
        return error
    }
}

module.exports = {
    setRandomPassword, 
    setArrayToSend,
    deleteArray,
    backupContractInHistorics
}