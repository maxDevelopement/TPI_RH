const Employee = require('../models/Employee')

module.exports = (app) => {
    app.get('/api/getAllEmployee', async (req, res) => {
        let dataToSend = []
        try{
            const allEmployeeDatas = await Employee.findAll()
            console.log(allEmployeeDatas)
            allEmployeeDatas.forEach(employee => {
                // AJOUTER COMPARAISON AVEC DATE DU JOUR
                if(employee.dataValues.endDate === null){ // check si eployé encore actif
                    dataToSend.push({
                        idEmployee: employee.dataValues.idEmployee,
                        firstname: employee.dataValues.firstname,
                        lastname: employee.dataValues.lastname
                    })
                }
            })
            console.log("data to send : ", dataToSend)
            const msg = `success_getAllEmployee`
            return res.status(200).send({ msg: msg, data: dataToSend })
        }catch(error){
            const msg = `error_getAllEmployee`
            return res.status(500).send(msg)
        }
    })
}