const { fetchCategories, fetchReviews, fetchReviewByID } = require ('./models')



const getCategories = (req, res, next) => {
    fetchCategories()
    .then((categories) => {
        res.status(200).send(categories)}
        )}

    

const getReviews = (req, res, next) => {
    fetchReviews()
    .then((reviews) => {
        res.status(200).send(reviews)
    })
}

const getReviewsByID = (req, res, next) => {
    const query = req.params.review_id
    fetchReviewByID(query)
    .then((reviewsID) => {
        res.status(200).send(reviewsID)
    })
}







module.exports = { getCategories, getReviews, getReviewsByID}