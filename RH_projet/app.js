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
    credentials: true, // si vous utilisez des cookies ou des authentifications basées sur des en-têtes
    origin: true // ou spécifiez vos domaines si nécessaire
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
require('./routes/insertEvaluation')(app)
require('./routes/insertLeaveRequest')(app)
require('./routes/updateLeaveRequest')(app)



// erreur 404 si aucunes route n'est trouvée
app.use((req, res) => {
    const message = 'erreur 404 ! '
    res.status(404).json({message})
})
