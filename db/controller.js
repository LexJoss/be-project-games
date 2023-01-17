const { fetchCategories, fetchReviews } = require ('./models')



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







module.exports = { getCategories, getReviews}