const { 
    fetchCategories, 
    fetchReviews, 
    fetchReviewByID, 
    fetchCommentsByRid} = require ('./models')



const getCategories = (req, res, next) => {
    fetchCategories()
    .then((categories) => {
        res.status(200).send(categories)}
        )}

    

const getReviews = (req, res, next) => {
    fetchReviews()
    .then((reviews) => {
        res.status(200).send(reviews)})
    
}


const getReviewsByID = (req, res, next) => {
    const query = req.params.review_id
    fetchReviewByID(query)
    .then((reviewsID) => {
        res.status(200).send(reviewsID)
    }) 
    .catch(err => next(err) );
}

const getCommentsByRid = (req, res, next) => {
    const query = req.params
    fetchCommentsByRid(query)
    .then((comments) => {
        res.status(200).send(comments)
    })
    .catch(err => next(err))
}






module.exports = { 
    getCategories, 
    getReviews, 
    getReviewsByID, 
    getCommentsByRid}