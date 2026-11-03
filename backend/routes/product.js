const express = require("express");
const {
  getProducts,
  getSingleProduct,
  createProduct,
} = require("../controllers/productController");

const router = express.Router();

//          (Router Path).get(actionInside)
router.route("/products").get(getProducts).post(createProduct);

router.route("/products/:id").get(getSingleProduct);

module.exports = router;
