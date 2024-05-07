const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000 
const path = require('path')
const initDb = require('./db/initDb')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()
const authenticateToken = require('./helpers/authentification')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'src')))
app.get(('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'src')});
}))

app.listen(port, () => console.log(`server run on port ${port}`))
//initDb()


require('./routes/login')(app)
app.use(authenticateToken)
//require('./routes/insertEmployee')(app)

// erreur 404 si aucunes route n'est trouvée
app.use((req, res) => {
    const message = 'erreur 404 ! '
    res.status(404).json({message})
})
