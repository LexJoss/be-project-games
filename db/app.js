const express = require ("express")
const app = express()
const cors = require('cors');

app.use(cors());
app.use(express.json())
const { getCategories, 
        getReviews, 
        getReviewsByID, 
        getCommentsByRid,
        sendComments,
        sendPatch,
        sendDelete
                        }  = require ('./controller')


app.get('/api/categories', getCategories)



app.get('/api/reviews', getReviews)


app.get('/api/reviews/:review_id', getReviewsByID)


app.get('/api/reviews/:review_id/comments', getCommentsByRid)

app.post('/api/reviews/:review_id/comments', sendComments)

app.patch('/api/reviews/:review_id', sendPatch)

app.delete('/api/comments/:comment_id', sendDelete)

//error handling

app.use((err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({msg : "Bad Request"}) 
    } else {next(err)}
})

app.use((err, req, res, next) => {
    res.status(err.status).send({msg: err.msg}
        )
})


module.exports = app