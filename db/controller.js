const { 
    fetchCategories, 
    fetchReviews, 
    fetchReviewByID, 
    fetchCommentsByRid,
    postComments,
    patchVotes,
    fetchUsers
                    } = require ('./models')



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

const sendComments = (req, res, next) => {
    const query = req.params
    const post = req.body
    postComments(query, post)
    .then((comments) => {
        res.status(201).send(comments)
    })
    .catch(err => next(err))
    
}


const sendPatch =(req, res, next) => {
    const query = req.params
    const patch = req.body.inc_votes
    patchVotes(query, patch)
    .then((response) => {
        res.status(200).send(response)
    })
    .catch(err => next(err))
}

const getUsers = (req, res, next) => {
    fetchUsers()
    .then((users) => {
        res.status(200).send(users)
    })
    .catch(err => next(err))

}



module.exports = { 
    getCategories, 
    getReviews, 
    getReviewsByID, 
    getCommentsByRid,
    sendComments,
    sendPatch,
    getUsers
    }