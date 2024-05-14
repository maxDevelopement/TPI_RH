const Employee = require('../models/Employee') 
const Contract = require('../models/Contract')
const bcrypt = require('bcrypt')

module.exports = (app) => {
    app.put('/api/updateEmployee', async (req, res) => {
       console.log("recpetion requete")
        const body = req.body
        console.log("body : ", body.lastname)
        console.log("modele : ", Employee)
        const password = body.password
        const cryptedPassword = await bcrypt.hash(password, 10)
        console.log("crypted : , ", cryptedPassword)
        
        const searchedEmployee = await Employee.findOne({where: {idEmployee: body.idEmployee}})
        const searchedContract = await Contract.findOne({where: {fkEmployee: body.idEmployee}})

        searchedEmployee.set({
            pseudo: 'Entreprise2',
            password: cryptedPassword,
            lastname: body.lastname,
            firstname: body.firstname,
            email: body.email,
            job: body.job,
            phone: body.phone,
            iban: body.iban,
            street: body.street,
            number: body.number,
            npa: body.npa,
            city: body.city,
            rate: body.rate,
            activ: body.activ
        })
        // insertion dans la table "Contract"
        searchedContract.set({
            type: body.type,
            startDate: body.startDate,
            endDate: null,
            fkEmployee: body.idEmployee
        })
        await searchedEmployee.save()
        await searchedContract.save()

        return res.status(200).send(`success_updateEmployee`)
    })
}