const { string } = require("pg-format")
const db = require("./connection")
const reviews = require("./data/test-data/reviews")


const fetchCategories = () => {
    let sqlString = `SELECT * FROM categories`
    return db.query(sqlString)
        .then(({ rows }) => rows)
}


const fetchReviews = (query) => {

    let sort_by = query.sort_by
    if (sort_by === undefined) {sort_by = 'created_at'}


    let category = query.category
    const values = []
    if (category !== undefined) {values.push(category)}


    let order = query.order
    if (order === undefined) {order = 'desc'}
    if (order !== 'asc' && order !== 'desc') {return Promise.reject({status: 400, msg: "Bad Request"})}
    

    let sqlString = `SELECT reviews.*, count(comments.review_id) AS comment_count 
        FROM reviews 
            FULL JOIN comments ON reviews.review_id = comments.review_id`

    if (category !== undefined) {sqlString += ` WHERE category = $1`}

        sqlString += ` GROUP BY reviews.review_id
        ORDER BY `

    switch(sort_by) {
        case 'review_id': sqlString += 'reviews.review_id'
        break;
        case 'votes': sqlString += 'reviews.votes'
        break; 
        case 'created_at': sqlString += 'reviews.created_at'
        break;
        case 'title': sqlString += 'reviews.title'
        break;
        case 'category': sqlString += 'reviews.category'
        break;
        case 'owner': sqlString += 'reviews.owner'
        break;
        case 'designer': sqlString += 'reviews.designer' 
        break; 
        case 'comments': review += 'comment_count'
        break;
        default: return Promise.reject({status: 400, msg : 'Bad Request'})}
     

    if (order === 'asc') {sqlString += ` ASC ;`} else {sqlString += ' DESC ;'}

    
    return db.query(sqlString, values)
        .then(({ rows }) => rows)
}

const fetchReviewByID = (review_id) => {
    if (isNaN(review_id)) {return Promise.reject({status : 400, msg : "Bad Request"})}
    const sqlString = `SELECT reviews.*, count(comments.review_id) AS comment_count 
    FROM reviews 
        FULL JOIN comments ON reviews.review_id = comments.review_id
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id;`


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

const postComments = (query, post) => {
    const values = [query.review_id, post.body, post.username]
    const values2 = [post.username]
    
    if (post.body === undefined || post.username === undefined) {return Promise.reject({status : 400, msg : "Bad Request"})}
    if (isNaN(query.review_id) || (typeof post.body) !== 'string') {return Promise.reject({status : 400, msg : "Bad Request"})}
    
    const checkUserSql = `SELECT * FROM users
    WHERE username = $1;`

    
    const sqlString = `INSERT INTO comments (review_id, body, author)
    VALUES
    ($1, $2, $3)
    RETURNING *;`

    return db.query(checkUserSql, values2).then((result) => {
        if (result.rowCount === 0) {return Promise.reject({status: 400, msg: "Not a Valid Username"})}
        else {
    

    return fetchReviewByID(query.review_id)
        .then(() => { return db.query(sqlString, values) })
        .then(({ rows }) => rows)}} 
)}

const patchVotes = (query, patch) => {
    const values = [query.review_id, patch]

    
    if (isNaN(patch) || patch === undefined) {return Promise.reject({status : 400, msg: "Bad Request"})}

    const sqlString = `UPDATE reviews
    SET votes = votes + $2
    WHERE review_id = $1
    RETURNING *;`

    return fetchReviewByID(query.review_id)
    .then (() => {return db.query(sqlString, values)
    .then(({rows}) => rows)}) 
}

const deleteComment = (query) => {

    const check = parseInt(query.comment_id)
    if (isNaN(check)) {return Promise.reject({status: 400, msg: "Bad Request"})}

    
    const values = [query.comment_id]

    let sqlString = `DELETE FROM comments
    WHERE comment_id = $1;`

    return checkComment(query.comment_id)
    .then (() => {return db.query(sqlString, values)
    .then(({rows}) => rows)}) 
}


const checkComment =(check) => {

    const values = [check]

    let sqlString = `SELECT FROM comments
    WHERE comment_id = $1;`

    return db.query(sqlString, values)
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: "Not Found" })
            } else {
                return rows
            }
        })
}

    





module.exports = {
    fetchCategories,
    fetchReviews,
    fetchReviewByID,
    fetchCommentsByRid,
    postComments,
    patchVotes,
    deleteComment
}