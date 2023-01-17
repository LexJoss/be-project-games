const  db  = require ("./connection")


const fetchCategories = () => {
    let sqlString = `SELECT * FROM categories`
    return db.query(sqlString)
    .then (({rows}) => rows)
}


const fetchReviews = () => {
    
    let sqlString = `SELECT reviews.*, count(*) AS comment_count 
        FROM reviews 
            FULL JOIN comments ON reviews.review_id = comments.review_id
        GROUP BY reviews.review_id
        ORDER BY reviews.created_at desc;`
        
        return db.query(sqlString)
        .then (({rows}) => rows)
    }





module.exports = { fetchCategories, fetchReviews }