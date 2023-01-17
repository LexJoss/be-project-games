const express = require ("express")
const app = express()
const getCategories = require ('./controller')

app.get('/api/:search', getCategories)




module.exports = app