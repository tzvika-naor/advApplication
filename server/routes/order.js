const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.get("", orderController.getOrders); //all order ===     axios.get(http://localhost:5000/api/orders)
// router.get("/:id",orderController.getOrder); 
// single order   axios.get(http://localhost:5000/api/orders/:id)
router.post("", orderController.createOrder);
// add a new order to the database   axios.post(http://localhost:5000/api/orders)
// router.put("/:id", orderController.updateOrder); //update an existing order    axios.updated(http://localhost:5000/api/orders:/id)
// router.delete("/:id", orderController.deleteOrder);                           //axios.delete(http://localhost:5000/api/orders/:id)

module.exports = router;