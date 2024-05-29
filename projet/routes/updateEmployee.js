const Employee = require('../models/Employee') 
const Contract = require('../models/Contract')
const bcrypt = require('bcrypt')
const { checkChangeContract } = require('../helpers/checks')

// ce endpoint ne fonctionne pas
// Met à jour les informations d'un employé et de son contrat.
// Retourne un message de succès si la mise à jour est effectuée, sinon retourne un message d'erreur
module.exports = (app) => {
    app.put('/api/updateEmployee', async (req, res) => {
        const body = req.body
        const password = body.password
        const cryptedPassword = await bcrypt.hash(password, 10)
        
        const searchedEmployee = await Employee.findOne({where: {idEmployee: body.idEmployee}})
        const searchedContract = await Contract.findOne({where: {fkEmployee: body.idEmployee}})

        if(!searchedEmployee || !searchedContract){
            const msg = `error_data`
            return res.status(400).send(msg)
        }

        checkChangeContract()

        searchedEmployee.set({
            pseudo: body.pseudo,
            password: cryptedPassword,
            lastname: body.lastname,
            firstname: body.firstname,
            email: body.email,
            phone: body.phone,
            iban: body.iban,
            street: body.street,
            number: body.number,
            npa: body.npa,
            city: body.city,
            activ: body.activ
        })
        // insertion dans la table "Contract"
        searchedContract.set({
            type: body.type,
            startDate: body.startDate,
            endDate: null,
            fkEmployee: body.idEmployee,
            rate: body.rate,
            job: body.job,
        })
        await searchedEmployee.save()
        await searchedContract.save()

        return res.status(200).send(`success_updateEmployee`)
    })
}