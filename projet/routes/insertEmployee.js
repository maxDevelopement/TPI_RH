const Employee = require('../models/Employee') 
const Contract = require('../models/Contract')
const bcrypt = require('bcrypt')
const { sequelize } = require('../db/sequelize')
const Sequelize = require('sequelize')
const { setRandomPassword } = require('../helpers/setters')

module.exports = (app) => {
    app.put('/api/insertEmployee', async (req, res) => {
        const body = req.body
        const generatedPassword = setRandomPassword()   
        console.log("passw0rd : ", generatedPassword) 
        const cryptedPassword = await bcrypt.hash(generatedPassword, 10)
        try{
            // insertions dans la table "Employee"
            const insertEmployee = await Employee.create({
                pseudo: `pending`,
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
            insertEmployee.pseudo = `${body.firstname}${insertEmployee.idEmployee}`
            await insertEmployee.save()
            // insertion dans la table "Contract"
            await Contract.create({
                fkEmployee: insertEmployee.idEmployee,
                type: body.type,
                email: body.email_prof,
                phone: body.phone_prof,
                startDate: body.startDate,
                endDate: null,
                job: body.job,                
                service: body.service,
                rate: body.rate,
                salary: body.salary
            })
            const msg = `success_insertEmployee`
            return res.status(200).send({msg: msg, user: {pseudo: insertEmployee.pseudo, password: generatedPassword}})
        }catch(error){
            console.log(error)
            if (error instanceof Sequelize.UniqueConstraintError) {
                const msg = 'unicity_error'
                return res.status(400).send(msg)
            }else{
                const msg = `system_error`
                return res.status(500).send(msg)
            }
        }   
    })
}