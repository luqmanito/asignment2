const express = require('express')
const server = express()
const mainRouter = require('./src/routes/main')
require("dotenv").config()
const {LOCAL_PORT} = process.env
const cors = require("cors")
const postgreDB = require('./config')
const { json } = require('express')
server.use(cors())
const PORT = LOCAL_PORT
const corsOptions = {
    origin: "*"
}

postgreDB.connect().then(()=>{
    console.log('DB is connected');
    server.use(cors(corsOptions))
    server.use(express(json))
    server.use(express.urlencoded({extended: false}))
    server.use(mainRouter)
    server.listen(PORT, ()=> {
        console.log(`server is running at port ${PORT}`);
    })
})

server.get("/", (req, res)=> {
    console.log(req.body);
    
    res.json({
        msg: "Welcome"
    })
})

