const express = require ("express")
const app = express()
const {getCategories, getReviews} = require ('./controller')


app.get('/api/categories', getCategories)



app.get('/api/reviews', getReviews)



module.exports = app