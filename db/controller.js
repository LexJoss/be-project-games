const { fetchCategories } = require ('./models')



const getCategories = (req, res, next) => {
    fetchCategories()
    .then((categories) => {
        res.status(200).send(categories)
    })
}



module.exports = getCategories