const { getEmployeeById } = require('../helpers/getters')

module.exports = (app) => {
    app.put('/api/deleteEmployee', async (req, res) => {  
        const idEmployee = req.body.idEmployee
        const searchedEmployee = await getEmployeeById(idEmployee)
        if(searchedEmployee === null){
            const msg = `error_data`
            return res.status(400).send(msg)
        }
        try{
            await searchedEmployee.destroy()
            const msg = `success_deleteEmployee`
            return res.status(200).send(msg)
        }catch(error){
            const msg = `error_system`
            return res.status(500).send(msg)
        }
        
    })
}