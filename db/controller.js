const { fetchCategories } = require ('./models')



const getCategories = (req, res, next) => {
    const search = req.params
    fetchCategories(search)
    .then((returnValue) => {
        res.status(200).send(returnValue)
    })
}





module.exports = getCategories