const express = require('express')
const path = require('path')
const http = require('http')
var cors = require('cors')
const bodyParser = require('body-parser')

const voiceRouter = require('./routers/voice')

const app = express()
app.set("views", "./view")//SET VIEWS FOLDER
app.set("view engine", "ejs")//SET VIEW ENGINE(EJS)
const server = http.createServer(app)
const port = process.env.PORT || 4000
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(bodyParser.urlencoded({
    limit:'50mb', 
    extended: true,
    parameterLimit:50000
 }));
app.use(cors(corsOptions));
app.use(express.json({limit:'50mb'}))
app.use(voiceRouter)
app.use(express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
    console.log('Server is up on port ' + port)
})

module.exports = server;