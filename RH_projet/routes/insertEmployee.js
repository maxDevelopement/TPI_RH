const Employee = require('../models/Employee') 
const Contract = require('../models/Contract')
const bcrypt = require('bcrypt')

module.exports = (app) => {
    app.put('/api/insertEmployee', async (req, res) => {
       console.log("recpetion requete")
        const body = req.body
        console.log("body : ", body.lastname)
        console.log("modele : ", Employee)
        const password = 'Pa$$w0rd'
        const cryptedPassword = await bcrypt.hash(password, 10)
        console.log("crypted : , ", cryptedPassword)
        // insertions dans la table "Employee"
        const insertEmployee = await Employee.create({
            pseudo: 'Entreprise',
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
        const insertContract = await Contract.create({
            type: body.type,
            startDate: body.startDate,
            endDate: null,
            fkEmployee: insertEmployee.idEmployee
        })
        if(insertContract){
            return res.status(200).send(`success_insertEmployee`)
        }
    })
}