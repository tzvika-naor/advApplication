const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');

router.get("/reviews", ProductController.getReviews);
router.get("/category",  ProductController.getCategory); //all Product
router.get("", ProductController.getProducts); //all Product
router.get("/:id",ProductController.getProduct); // single Product
router.post("", ProductController.createProduct); // add a new Product to the database
router.put("/:id", ProductController.updateProduct); //update an existing Product
router.delete("/:id", ProductController.deleteProduct);
router.post("/searchQuery", ProductController.searchQuery);

module.exports = router;
