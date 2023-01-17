const  db  = require ("./connection")

const fetchCategories = (find_by, ascDesc = 'asc') => {
    parameter = find_by.search
    order = ascDesc

    let sqlString = `SELECT * FROM ${parameter}`

    if (parameter === 'reviews') {
        order = 'desc' 
        sqlString = `SELECT reviews.*, count(*) AS comment_count 
        FROM reviews 
            FULL JOIN comments ON reviews.review_id = comments.review_id
        GROUP BY reviews.review_id
        ORDER BY reviews.created_at ${order};`
    }



    return db.query(sqlString)
    .then(({rows}) => rows)
}


module.exports = { fetchCategories }