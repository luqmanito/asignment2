const postgreDB = require("../../config");

const getProducts = (queryParams, body) => {
  return new Promise((resolve, reject) => {
    let query = `select * from products`;
    const { date1, date2 } = body;
    if (queryParams.search) {
      query += ` where lower(name) like lower('%${queryParams.search}%')`;
    }
    if (Object.keys(body).length === 0) {
      if (queryParams.sort == "oldest") {
        query += ` order by transaction_time asc`;
      }
      if (queryParams.sort == "newest") {
        query += ` order by transaction_time desc`;
      }
      if (queryParams.sort == "less-popular") {
        query += ` order by sold asc`;
      }
      if (queryParams.sort == "most-popular") {
        query += ` order by sold desc`;
      }
      if (queryParams.sort == "ascending") {
        query += ` order by name asc `;
      }
      if (queryParams.sort == "descending") {
        query += ` order by name desc `;
      }
      postgreDB.query(query, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log('as',query);
        return resolve(result);
      });
    }

    if (Object.keys(body).length === 2) {
      query += ` where transaction_time between $1 and $2`;
      postgreDB.query(query, [date1, date2], (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log('su',query);
        return resolve(result);
      });
    }
  });
};

const addProducts = (body) => {
  return new Promise((resolve, reject) => {
    const { name, category, quantity, sold, transaction_time } = body;

    const query =
      "insert into products (name,  category,  quantity, sold, transaction_time) values ($1,$2,$3,$4,$5)";
    postgreDB.query(
      query,
      [name, category, quantity, sold, transaction_time],
      (err, response) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(query);
        resolve(response);
      }
    );
  });
};

const editProducts = (body, queryParams) => {
  return new Promise((resolve, reject) => {
    // const { name, category, quantity, sold, transaction_time } = body;
    let query = "update products set ";
    const values = [];

    Object.keys(body).forEach((key, idx, array) => {
      if (idx === array.length - 1) {
        query += ` ${key} = $${idx + 1} where id = $${idx + 2}`;
        values.push(body[key], queryParams.id);
        return;
      }
      query += `${key} = $${idx + 1},`;
      values.push(body[key]);
    });
    postgreDB.query(query, values, (err, result) => {
      if (err) {
        console.log(query, values, file);
        return reject(err);
      }
      console.log(values);
      console.log(query);
      resolve(result);
    });
  });
};

const dropProducts = (queryParams) => {
  return new Promise((resolve, reject) => {
    const query = "delete from products where id = $1 returning *";
    postgreDB.query(query, [queryParams.id], (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      resolve(result);
    });
  });
};

const productsModels = {
  getProducts,
  addProducts,
  editProducts,
  dropProducts,
};

module.exports = productsModels;
