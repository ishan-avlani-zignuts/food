const router = require("express").Router();

const { getOrdersById } = require("../controllers/orderController");

router.get("/getordersbyid/:userId", getOrdersById);

module.exports = router;
