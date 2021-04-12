const express = require("express");
const Products = require("../controllers/products");

const router = express.Router();

router.post("/", Products.createProduct);
router.patch("/:id", Products.updateProduct);
router.delete("/:id", Products.deleteProduct);
router.get("/:id", Products.getProductById);
router.get("/", Products.getProducts);

module.exports = router;