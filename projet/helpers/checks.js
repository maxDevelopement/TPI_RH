const LeaveRequest = require('../models/Leaverequest')
const JobOffer = require('../models/Joboffer')
const Evaluation = require('../models/Evaluation')
const Candidacy = require('../models/Candidacy')
const { Op } = require('sequelize')

// cette fonction check si une demande de congé a une meme startDate pour cet user
// manque le check de si une date fait partie d'une autre demande de congé 
async function checkValidityLeaveRequest(idUser, startDate){
    console.log("checkLeaveRequestValidity")
    try{
        const leaveReqCheck = await LeaveRequest.findAll(
            {
                where: {
                    [Op.and]: [{fkContract: idUser}, {startDate: startDate}]
                },
            }
        )
        console.log("result : ", leaveReqCheck)
        if(!leaveReqCheck || leaveReqCheck.length === 0){
            return true
        }
        return false
    }catch(error){
        return true
    }    
}

// verifie que le job existe et est statut toujours pending ==> insertCandidacy
async function checkValidityJobOffer(idJob){
    const jobSearched = (await JobOffer.findOne({where: {idJobOffer: idJob}}))
    if(!jobSearched){
        return false
    }
    if(jobSearched && jobSearched.dataValues.status === 'pending'){
        return true
    }else{
        return false
    }
}

async function checkValidityCandidacy(idJobOffer, mail, phone){
    try{
        const checkCandidacy = await Candidacy.findOne({
            where: {
                [Op.and]: [
                    {fkJobOffer: idJobOffer},
                    {[Op.or]: [{mail: mail}, {phone: phone}]}
                ] 
            }
        })
        if(!checkCandidacy){
            return true
        }else{
            return false
        }
    }catch(error){
        return false
    }
}
    
// check si des infos ont changées dans le contrat
// renvoie true si identique
function checkChangeData(oldArray, newArray){
    const oldOne = JSON.stringify(oldArray)
    const newOne = JSON.stringify(newArray)

    if(oldOne === newOne){
        return true
    }else{
        return false
    }
}
// check si une evaluation a deja ete remplie pour cet user et cette année 
// renvoie false si c'est le cas ou true si non
async function checkEvaluationyear(idContract, evaluationYear){
    try{
        const evaluationYearExist = await Evaluation.findOne(
            {
                where: {
                    [Op.and]: [
                        {fkContract: idContract},
                        {evaluationYear: evaluationYear}
                    ] 
                } 
            }
        )
        if(!evaluationYearExist){
            return false
        }else if(evaluationYear){
            return true
        }
    }catch(error){
        return false
    }
}

module.exports = {
    checkValidityLeaveRequest, 
    checkValidityJobOffer,
    checkChangeData,
    checkValidityCandidacy,
    checkEvaluationyear
}