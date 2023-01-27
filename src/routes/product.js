const express = require("express");

const productsRouter = express.Router();
const {  add,get,edit,drop } = require("../controllers/products");


productsRouter.get("/all", get);
productsRouter.post("/add", add);
productsRouter.patch("/edit", edit)
productsRouter.delete("/delete", drop)

module.exports = productsRouter;
