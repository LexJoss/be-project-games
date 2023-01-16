const  db  = require ("./connection")

const fetchCategories = () => {
    let sqlString = `SELECT * FROM categories`
    return db.query(sqlString)
    .then(({rows}) => rows)
}


module.exports = { fetchCategories }