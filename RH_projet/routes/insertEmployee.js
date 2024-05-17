const Employee = require('../models/Employee') 
const Contract = require('../models/Contract')
const bcrypt = require('bcrypt')
const { sequelize } = require('../db/sequelize')

module.exports = (app) => {
    app.put('/api/insertEmployee', async (req, res) => {
        const body = req.body
        const password = 'Pa$$w0rd'
        const cryptedPassword = await bcrypt.hash(password, 10)
        //const transaction = await sequelize.transaction()
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
                rate: body.rate,
                activ: body.activ
            })//, { transaction })
            console.log(insertEmployee)
            insertEmployee.pseudo = `${body.firstname}${insertEmployee.idEmployee}`
            await insertEmployee.save()
            //await insertEmployee.save({transaction})
            console.log(insertEmployee)
            // insertion dans la table "Contract"
            await Contract.create({
                type: body.type,
                startDate: body.startDate,
                endDate: null,
                fkEmployee: insertEmployee.idEmployee,
                job: body.job,
                rate: body.rate
            })
            return res.status(200).send(`success_insertEmployee`)
        }catch(error){
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