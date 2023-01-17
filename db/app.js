const express = require ("express")
const app = express()
const {getCategories, getReviews, getReviewsByID} = require ('./controller')


app.get('/api/categories', getCategories)



app.get('/api/reviews', getReviews)


app.get('/api/reviews/:review_id', getReviewsByID)

module.exports = app