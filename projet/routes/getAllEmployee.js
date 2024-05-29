const Employee = require('../models/Employee')
// Récupère les id, nom et prenoms de chaque employé actif actuellement
// retourne les données ou un message d'erreur en cas de problèmes
module.exports = (app) => {
    app.get('/api/getAllEmployee', async (req, res) => {
        let dataToSend = []
        try{
            const allEmployeeDatas = await Employee.findAll()
            allEmployeeDatas.forEach(employee => {
                if(employee.dataValues.activ === true){ // check si eployé encore actif
                    dataToSend.push({
                        idEmployee: employee.dataValues.idEmployee,
                        firstname: employee.dataValues.firstname,
                        lastname: employee.dataValues.lastname
                    })
                }
            })
            const msg = `success_getAllEmployee`
            return res.status(200).send({ msg: msg, data: dataToSend })
        }catch(error){
            const msg = `error_system`
            return res.status(500).send(msg)
        }
    })
}