const express = require ("express")
const app = express()
const { getCategories, 
        getReviews, 
        getReviewsByID, 
        getCommentsByRid
                        }  = require ('./controller')


app.get('/api/categories', getCategories)



app.get('/api/reviews', getReviews)


app.get('/api/reviews/:review_id', getReviewsByID)


app.get('/api/reviews/:review_id/comments', getCommentsByRid)

//error handling


app.use((err, req, res, next) => {
    res.status(err.status).send({msg: err.msg})
})


module.exports = app