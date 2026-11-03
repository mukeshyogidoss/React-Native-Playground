const { Mongoose } = require("mongoose");
const OrderModel = require("../models/orderModel");

//Create Order --> api/v1/order
exports.createOrder = async (req, res, next) => {
  const cartItems = req.body;
  const amount = Number(
    cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0),
  ).toFixed(3); //toFixed() for 3 deciamals pointss only

  const status = "pending";

  const orderDetails = await OrderModel.create({
    cartItems,
    amount,
    status,
    date: new Date(),
  });

  // orderModel.create();

  res.json({
    success: true,
    message: orderDetails,
  });
};
