const express = require ("express")
const app = express()
const getCategories = require ('./controller')

app.get('/api/categories', getCategories)


module.exports = app