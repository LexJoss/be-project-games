const db = require("./connection")


const fetchCategories = () => {
    let sqlString = `SELECT * FROM categories`
    return db.query(sqlString)
        .then(({ rows }) => rows)
}


const fetchReviews = () => {

    let sqlString = `SELECT reviews.*, count(comments.review_id) AS comment_count 
        FROM reviews 
            FULL JOIN comments ON reviews.review_id = comments.review_id
        GROUP BY reviews.review_id
        ORDER BY reviews.created_at desc;`

    return db.query(sqlString)
        .then(({ rows }) => rows)
}

const fetchReviewByID = (review_id) => {
    if (isNaN(review_id)) {return Promise.reject({status : 400, msg : "Bad Request"})}
    const sqlString = `SELECT * FROM reviews
    WHERE reviews.review_id = $1;`


    return db.query(sqlString, [review_id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: "Not Found" })
            } else {
                return rows
            }
        })
}


const fetchCommentsByRid = (review_id) => {
    const values = [review_id.review_id]
    if (isNaN(values)) {return Promise.reject({status : 400, msg : "Bad Request"})}
    const sqlString = `SELECT * FROM comments
    WHERE comments.review_id = $1;`

    return fetchReviewByID(review_id.review_id)
        .then(() => { return db.query(sqlString, values) })
        .then(({ rows }) => rows)
        
}



module.exports = {
    fetchCategories,
    fetchReviews,
    fetchReviewByID,
    fetchCommentsByRid
}