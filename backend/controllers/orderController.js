const asyncHandler = require("express-async-handler");

const Order = require("../models/order");

const getOrdersById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId });

    if (orders) {
      return res.status(200).send(orders);
    } else {
      return res.status(404).send({ message: "Cart not found for user" });
    }
  } catch (error) {
    console.error("Error during fetching cart:", error);
    res.status(500).send({ message: "Internal server error", error: error });
  }
});

module.exports = { getOrdersById };
