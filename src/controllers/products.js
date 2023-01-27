const response = require("../helpers/response");
const productsModels = require("../models/products");

const get = async (req, res) => {
  try {
    const result = await productsModels.getProducts(req.query);
    response(res, {
      status: 200,
      data: result.rows,
    });
  } catch (err) {
    response(res, {
      status: 404,
      message: err,
    });
  }
};

const add = async (req, res) => {
  try {
    const result = await productsModels.addProducts(req.body);
    response(res, {
      status: 200,
      message: `${req.body.name} has been added to product list`,
    });
  } catch (err) {
    response(res, {
      status: 404,
      message: err,
    });
  }
};

const edit = async (req, res) => {
  try {
    const result = await productsModels.editProducts(req.body, req.query);
    response(res, {
      status: 200,
      message: `Data with ID number ${req.query.id} has been edited`,
    });
  } catch (err) {
    response(res, {
      status: 404,
      message: err,
    });
  }
};

const drop = async (req, res) => {
  try {
    const result = await productsModels.dropProducts(req.query);
    response(res, {
      status: 200,
      message: `Product ${result.rows[0].name} has been deleted`,
    });
  } catch (err) {
    response(res, {
      status: 404,
      message: err,
    });
  }
};

const productsController = {
  get,
  add,
  edit,
  drop,
};

module.exports = productsController;
