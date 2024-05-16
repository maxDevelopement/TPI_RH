const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000 
const path = require('path')
const initDb = require('./db/initDb')
const cors = require('cors')
require('dotenv').config()
const authenticateToken = require('./helpers/authentification')

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
    origin: true 
}))

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'src')))
app.get(('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'src')});
}))

app.listen(port, () => console.log(`server run on port ${port}`))
initDb()

require('./routes/login')(app)
//app.use(authenticateToken)
require('./routes/insertCandidacy')(app)
require('./routes/insertEmployee')(app)
require('./routes/insertEvaluation')(app)
require('./routes/insertLeaveRequest')(app)
require('./routes/updateLeaveRequest')(app)
require('./routes/updateEmployee')(app)
require('./routes/updateCandidacy')(app)
require('./routes/getAllEmployee')(app)
require('./routes/getAllJobOffer')(app)
require('./routes/getAllEvaluationOfEmployee')(app)
require('./routes/getAllCandidacyOfJobOffer')(app)
require('./routes/getAllInterview')(app)
require('./routes/deleteCandidacy')(app)
require('./routes/deleteEmployee')(app)

// erreur 404 si aucunes route n'est trouvée
app.use((req, res) => {
    const message = 'erreur 404 ! '
    res.status(404).json({message})
})
