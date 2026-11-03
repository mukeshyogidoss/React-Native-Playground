const ProductModel = require("../models/productModels");

// GET all products
exports.getProducts = async (req, res, next) => {
  const products = await ProductModel.find({});

  res.json({
    success: true,
    products,
  });
};

// POST create product
exports.createProduct = async (req, res, next) => {
  const product = await ProductModel.create({
    name: "Samsung",
    price: "60000",
    description: "Samsung Galaxy A23",
    category: "Mobiles",
    seller: "Samsung",
    stock: "8",
    numOfReviews: "2",
    createdAt: new Date(),
  });

  res.json({
    success: true,
    product,
  });
};

// GET single product
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(404).json({
      sucess: false,
      message: "Unable to get this product with this ID",
    });
  }
};
