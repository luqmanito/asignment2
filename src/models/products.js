const postgreDB = require("../../config");



const getProducts = (queryparams) => {
    return new Promise((resolve, reject) =>{
        const query = `select * from products`
        if (queryparams.search) {
            query += `where lower(name) like lower('%${queryparams.search})`
        }
    })
}