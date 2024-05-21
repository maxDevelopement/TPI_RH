const Employee = require('../models/Employee') 
const Contract = require('../models/Contract')
const bcrypt = require('bcrypt')
const { sequelize } = require('../db/sequelize')
const Sequelize = require('sequelize')

module.exports = (app) => {
    app.put('/api/insertEmployee', async (req, res) => {
        const body = req.body
        const cryptedPassword = await bcrypt.hash(body.password, 10)
        console.log("crypted : ", cryptedPassword)
        try{
            // insertions dans la table "Employee"
            const insertEmployee = await Employee.create({
                pseudo: `pending`,
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
                activ: body.activ
            })
            insertEmployee.pseudo = `${body.firstname}${insertEmployee.idEmployee}`
            await insertEmployee.save()
            // insertion dans la table "Contract"
            await Contract.create({
                fkEmployee: insertEmployee.idEmployee,
                type: body.type,
                startDate: body.startDate,
                endDate: null,                
                service: body.service,
                rate: body.rate
            })
            return res.status(200).send(`success_insertEmployee`)
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