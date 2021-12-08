const express = require('express')
const Router = express.Router()

Router.get('/home', async (req, res)=>{
    try {
        res.render('index')
    } catch (e) {
        console.log(e)
    }
})

module.exports = Router