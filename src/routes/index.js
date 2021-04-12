const express = require("express");
const Products = require("./products");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Product service already running",
  });
});

router.use("/products", Products);

router.all("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Url is not valid, please check the documentation",
  });
});

module.exports = router;
