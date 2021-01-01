const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart');

router.get("", CartController.getCarts); //all Cart ===     axios.get(http://localhost:5000/api/carts)
router.get("/:id",CartController.getCart); // single Cart   axios.get(http://localhost:5000/api/carts/:id)
router.post("", CartController.createCart); // add a new Cart to the database   axios.post(http://localhost:5000/api/carts)
router.put("/:id", CartController.updateCart); //update an existing Cart    axios.updated(http://localhost:5000/api/carts:/id)
router.delete("/:id", CartController.deleteCart);                           //axios.delete(http://localhost:5000/api/carts/:id)

module.exports = router;