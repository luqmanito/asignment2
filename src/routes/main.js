const express = require("express");
const productsRouter = require("./product");
// const costRouter = require("./costComponent");
// const aptRouter = require("./getApt");
// const dataRouter = require("./propertyInventory");
// const tokenRouter = require("./reqToken");
const mainRouter = express.Router();
const prefix = "/api";


// mainRouter.use(`${prefix}/datas`, express.json(), dataRouter);
mainRouter.use(`${prefix}/products`, productsRouter);
// mainRouter.use(`${prefix}/request`, express.json(), tokenRouter);
// mainRouter.use(`${prefix}/request`, express.json(), costRouter);
// mainRouter.use(`${prefix}/get`, express.json(), aptRouter);

module.exports = mainRouter;
